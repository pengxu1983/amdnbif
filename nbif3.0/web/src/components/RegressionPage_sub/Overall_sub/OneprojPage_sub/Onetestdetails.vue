<template>
  <div>
    <el-button type="text" @click="gettestdetails()">{{testnum}}</el-button>
    
    <el-dialog :title="title" :visible.sync="visible" width="80%">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="prev, pager, next"
        :total="testnum">
      </el-pagination>
      <el-table :data="testdetails_disp">
        <el-table-column property="testname" label="testname" width="200"></el-table-column>
        <el-table-column property="seed" label="seed" width="200"></el-table-column>
        <el-table-column property="signature" label="signature"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Onetestdetails',
  props: {
    projectname : '',
    variantname : '',
    kind        : '',
    groupname   : '',
    changelist  : '',
    isBAPU      : '',
    shelve      : '',
    kickoffdate : '',
    testnum     : '',
  },
  data() {
    let title = '';
    if(this.kind  == 'FAIL'){
      title = 'Fail test list';
    }
    else if(this.kind == 'UNKNOWN'){
      title = 'Unknown test list';
    }
    return {
      testdetails       : [],
      testdetails_disp  : [],
      visible   : false,
      groupstatus: [],
      title : title
    }
  },
  methods : {
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
    gettestdetails  (){
      this.visible = true;
      this.$http.post('/regression/testdetails',{
        projectname : this.projectname,
        variantname : this.variantname,
        groupname   : this.groupname,
        changelist  : this.changelist,
        isBAPU      : this.isBAPU,
        shelve      : this.shelve,
        kickoffdate : this.kickoffdate,
        kind        : 'testdetails',
        result      : this.kind
      }).then(
        function(response){
          console.log(kind);
          console.log(response.body.testdetails);
          this.testdetails = response.body.testdetails;
          this.handleCurrentChange(1);
        },
        function(){}
      );
    },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
