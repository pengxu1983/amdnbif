<template>
  <el-tabs v-model="activeProj" type="card" @tab-click="handleClick">
    <el-tab-pane 
      v-for="oneproject in projects"
      :label="oneproject.projectname" 
      :name="oneproject.projectname"
    >
    </el-tab-pane>
    <OneprojPage
      v-bind:projectname="activeProj"
    >
    </OneprojPage>
  </el-tabs>
</template>

<script>
import OneprojPage  from '@/components/RegressionPage_sub/OfficialRegression_sub/OneprojPage.vue'
export default {
  name: 'OfficialRegression',
  props: {
  },
  components  : {
    OneprojPage
  },
  data() {
    return {
      projects    : [],
      activeProj  : 'mi200',
    }
  },
  methods : {
    getprojects (){
      this.$http.post('/config/projects/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log('all projects successfully get from DB');
            this.projects = JSON.parse(response.body.projects);
          }
        },
        function(){}
      );
    },
    handleClick(tab, event) {
      console.log(this.activeProj + ' clicked');
    },
  },
  mounted (){
    this.getprojects();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
