<template>
  <el-container>
    <el-header>
    <el-form :inline="true" :model="groupinfo" class="demo-form-inline">
      <el-form-item label="Project">
        <el-select v-model="groupinfo.projectname" placeholder="projectname">
          <el-option label="mi200" value="mi200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="groupinfo.groupname" placeholder="groupname">
          <el-option 
            v-for="onegroup in groups"
            label="onegroup" 
            value="onegroup"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getregressionstatus(groupinfo.projectname,groupinfo.groupname)">check</el-button>
      </el-form-item>
    </el-form>
    </el-header>
    <el-main>
    <el-table
      :data="regressionstatus"
      border
      style="width: 100%">
      <el-table-column
        prop="kickoffdate"
        label="kickoffdate"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="variantname"
        label="variantname"
        width="180">
      </el-table-column>
      <el-table-column
        prop="changelist"
        label="changelist"
        width="180">
      </el-table-column>
      <el-table-column
        prop="groupname"
        label="groupname"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isBACO"
        label="isBACO"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isBAPU"
        label="isBAPU"
        width="180">
      </el-table-column>
      <el-table-column
        prop="shelve"
        label="shelve"
        width="180">
      </el-table-column>
      <el-table-column
        prop="passrate"
        label="passrate">
      </el-table-column>
      <el-table-column
        prop="passnum"
        label="passnum">
      </el-table-column>
      <el-table-column
        prop="failnum"
        label="failnum">
        <template slot-scope="scope">
          <el-button type="text" @click="gettestdetails('FAIL',scope.row.projectname,scope.row.variantname,scope.row.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.isBACO,scope.row.shelve)">{{scope.row.failnum}}</el-button>

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
          <el-button type="text" @click="gettestdetails('UNKNOWN',scope.row.projectname,scope.row.variantname,scope.row.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.isBACO,scope.row.shelve)">{{scope.row.unknownnum}}</el-button>

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
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Bygrp',
  props: {
  },
  data() {
    return {
      groupinfo : {
        projectname : 'mi200',
        groupname : 'sanity',
      },
      groups  : [],
      regressionstatus: [{
        failnum : 200
      }],
      testdetails : [],
      testdetails_disp  : [],
      faillistvisible : false,
      unknownlistvisible  : false,
    }
  },
  methods : {
    getregressionstatus(projectname,groupname){
      this.$http.post('/regression/get',{
        kind  : 'Bygrp',
        projectname : projectname,
        groupname : groupname
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            console.log('abc');
            console.log(response.body.regressions);
            console.log(typeof(response.body.regressions));
            this.regressionstatus=  response.body.regressions;
          }
          else{
            console.log(response.body);
          }
        },
        function(){}
      );
      return [];
    },
    gettestdetails  (kind,projectname,variantname,groupname,changelist,isBAPU,isBACO,shelve){
      if(kind == 'FAIL'){
        this.faillistvisible= true;
        this.$http.post('/regression/testdetails',{
          projectname : projectname,
          variantname : variantname,
          groupname   : groupname,
          changelist  : changelist,
          isBAPU      : isBAPU,
          isBACO      : isBACO,
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
        this.unknownlistvisible= true;
        this.$http.post('/regression/testdetails',{
          projectname : projectname,
          variantname : variantname,
          groupname   : groupname,
          changelist  : changelist,
          isBAPU      : isBAPU,
          isBACO      : isBACO,
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
    getgroups (projectname){
      this.$http.post('/regression/get',{
        kind  : 'Bygrp',
        projectname : this.groupinfo.projectname,
        groupname   : this.groupinfo.groupname
      }).then(
        function(response){
          console.log(response.body.ok);
        },
        function(){}
      );
    },
  },
  mounted (){
    this.getregressionstatus(this.groupinfo.projectname,this.groupinfo.groupname);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
