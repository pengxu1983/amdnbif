<template>
  <el-tabs v-model="activeProj" type="card" @tab-click="handleClick">
    <el-tab-pane label="mi200" name="mi200">
      <el-table
        :data="regressionstatus_disp['mi200']"
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
      regressionstatus_disp : {}
    }
  },
  methods : {
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
            this.regressionstatus_disp[projectname]=  response.body.regressions;
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
