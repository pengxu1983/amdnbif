<template>
  <el-tabs v-model="activeProj" type="card" @tab-click="handleClick">
    <el-tab-pane label="mi200" name="mi200">
      <el-table
        :data="regressionstatus_mi200"
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
            <el-button type="text" @click="gettestdetails('fail',scope.row.projectname,scope.row.variantname,'all',scope.row.changelist,scope.row.isBAPU,scope.row.isBACO,scope.row.shelve)">{{scope.row.failnum}}</el-button>

            <el-dialog title="fail tests list" :visible.sync="faillistvisible" width="80%">
              <el-pagination
                @current-change="handleCurrentChange(val)"
                :page-size="100"
                layout="prev, pager, next"
                :total="scope.row.failnum">
              </el-pagination>
              <el-table :data="testdetails">
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
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Overall',
  props: {
  },
  data() {
    return {
      projects  : [],
      projectinfo : {
        projectname : 'mi200'
      },
      activeProj: 'mi200',
      regressionstatus_mi200 : [],
      testdetails : [],
      faillistvisible: false,
    }
  },
  methods : {
    handleCurrentChange (val){
    },
    gettestdetails  (kind,projectname,variantname,groupname,changelist,isBAPU,isBACO,shelve){
      if(kind == 'fail'){
        this.faillistvisible = true;
        this.$http.post('/regression/testdetails',{
          projectname : projectname,
          variantname : variantname,
          groupname   : groupname,
          changelist  : changelist,
          isBAPU      : isBAPU,
          isBACO      : isBACO,
          shelve      : shelve,
          kind        : 'testdetails'
        }).then(
          function(response){
            console.log(response.body.ok);
          },
          function(){}
        );
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    regressionstatus(projectname){
      this.$http.post('/regression/get',{
        kind  : 'Overall',
        projectname : projectname
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            console.log('abc');
            console.log(response.body.regressions);
            console.log(typeof(response.body.regressions));
            this.regressionstatus_mi200 =  response.body.regressions;
          }
          else{
            console.log(response.body);
          }
        },
        function(){}
      );
      return [];
    },
  },
  mounted (){
    this.regressionstatus('mi200');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
