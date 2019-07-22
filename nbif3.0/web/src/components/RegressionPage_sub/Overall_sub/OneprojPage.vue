<template>
  <div>
    <el-table
      :data="regressionstatus_disp"
      border
      style="width: 100%">
      <el-table-column
        prop="kickoffdate"
        label="kickoffdate"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="variantname"
        label="variantname"
      >
      </el-table-column>
      <el-table-column
        prop="changelist"
        label="changelist"
      >
      </el-table-column>
      <el-table-column
        prop="isBAPU"
        label="isBAPU"
      >
      </el-table-column>
      <el-table-column
        prop="shelve"
        label="shelve"
      >
      </el-table-column>
      <el-table-column
        prop="passrate"
        label="passrate"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="getgroupstatus(scope.row.projectname,scope.row.variantname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve)">{{scope.row.passrate}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="alltestnum"
        label="alltestnum">
      </el-table-column>
      <el-table-column
        prop="passnum"
        label="passnum">
      </el-table-column>
      <el-table-column
        prop="failnum"
        label="failnum">
        <template slot-scope="scope">
          <el-button type="text" @click="gettestdetails('FAIL',scope.row.projectname,scope.row.variantname,'all',scope.row.changelist,scope.row.isBAPU,scope.row.shelve)">{{scope.row.failnum}}</el-button>
    
          <el-dialog title="FAIL tests list" :visible.sync="faillistvisible" width="80%">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="100"
              layout="prev, pager, next"
              :total="scope.row.failnum">
            </el-pagination>
            <el-table :data="testdetails_disp">
              <el-table-column property="testname" label="testname" width="200"></el-table-column>
              <el-table-column property="seed" label="seed" width="200"></el-table-column>
              <el-table-column property="signature" label="signature"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column
        prop="unknownnum"
        label="unknownnum">
        <template slot-scope="scope">
          <el-button type="text" @click="gettestdetails('UNKNOWN',scope.row.projectname,scope.row.variantname,'all',scope.row.changelist,scope.row.isBAPU,scope.row.shelve)">{{scope.row.unknownnum}}</el-button>
    
          <el-dialog title="unknown tests list" :visible.sync="unknownlistvisible" width="80%">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="100"
              layout="prev, pager, next"
              :total="scope.row.unknownnum">
            </el-pagination>
            <el-table :data="testdetails_disp">
              <el-table-column property="testname" label="testname" width="200"></el-table-column>
              <el-table-column property="seed" label="seed" width="200"></el-table-column>
              <el-table-column property="signature" label="signature"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-table
      :data="groupstatus"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="DVgroup"
        label="DVgroup"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="groupname"
        label="groupname"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="passrate"
        label="passrate"
        sortable
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OneprojPage',
  props: {
    projectname : ''
  },
  data() {
    return {
      regressionstatus_disp: [],
      testdetails             : [],
      testdetails_disp        : [],
      faillistvisible   : false,
      unknownlistvisible: false,
      groupstatus: []
    }
  },
  methods : {
    getinfo (){
      this.$http.post('/config/variants/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.variants = JSON.parse(response.body.variants);
            console.log('all variants successfully get from DB');
          }
        },
        function(){}
      );
      this.$http.post('/config/projects/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            //console.log(response.body.projects);
            console.log('all projects successfully get from DB');
            this.projects = JSON.parse(response.body.projects);
          }
        },
        function(){}
      );
    },
    handleCurrentChange (val){
      console.log(val);
      this.testdetails_disp=[];
      let maxindex;
      if((val*100)<this.testdetails.length){
        maxindex = (val*100);
      }
      else{
        maxindex = this.testdetails.length;
      }
      for(let i=((val-1)*100);i<maxindex;i++){
        this.testdetails_disp.push(this.testdetails[i]);
      }
    },
    handleCurrentChange_mi200_unknown (val){
      console.log(val);
      this.testdetails_disp=[];
      let maxindex;
      if((val*100)<this.testdetails.length){
        maxindex = (val*100);
      }
      else{
        maxindex = this.testdetails.length;
      }
      for(let i=((val-1)*100);i<maxindex;i++){
        this.testdetails_disp.push(this.testdetails[i]);
      }
    },
    getgroupstatus(projectname,variantname,changelist,isBAPU,shelve){
      console.log('method : groupstatus');
      this.$http.post('/regression/groupstatus',{
        kind  : 'all',
        projectname : projectname,
        variantname : variantname,
        changelist  : changelist,
        isBAPU      : isBAPU,
        shelve      : shelve
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body.groupstatus);
            console.log(typeof(response.body.groupstatus));
            this.groupstatus= response.body.groupstatus;
          }
          else{
            console.log(response.body);
          }
        },
        function(){},
      );
    },
    gettestdetails  (kind,projectname,variantname,groupname,changelist,isBAPU,shelve){
      if(kind == 'FAIL'){
        this.faillistvisible = true;
        this.$http.post('/regression/testdetails',{
          projectname : projectname,
          variantname : variantname,
          groupname   : groupname,
          changelist  : changelist,
          isBAPU      : isBAPU,
          shelve      : shelve,
          kind        : 'testdetails',
          result      : kind
        }).then(
          function(response){
            console.log(response.body.ok);
            console.log(response.body.testdetails);
            this.testdetails = response.body.testdetails;
            this.handleCurrentChange(1);
          },
          function(){}
        );
      }
      else if(kind == 'UNKNOWN'){
        this.unknownlistvisible = true;
        this.$http.post('/regression/testdetails',{
          projectname : projectname,
          variantname : variantname,
          groupname   : groupname,
          changelist  : changelist,
          isBAPU      : isBAPU,
          shelve      : shelve,
          kind        : 'testdetails',
          result      : kind
        }).then(
          function(response){
            console.log(response.body.ok);
            console.log(response.body.testdetails);
            this.testdetails = response.body.testdetails;
            this.handleCurrentChange(1);
          },
          function(){}
        );
      }
    },
    //handleClick(tab, event) {
    //  console.log(this.projectname + ' clicked');
    //  this.regressionstatus(this.projectname);
    //},
    regressionstatus(projectname){
      console.log('regressionstatus');
      console.log(projectname);
      this.$http.post('/regression/get',{
        kind  : 'Overall',
        projectname : projectname
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            this.regressionstatus_disp=  response.body.regressions;
            console.log('dbg1');
            console.log(projectname);
            console.log(this.regressionstatus_disp);
          }
          else{
            console.log(response.body);
          }
        },
        function(){}
      );
    },
  },
  mounted (){
    this.regressionstatus(this.projectname);
    this.getinfo();
    console.log('mounted : ' +this.projectname);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
