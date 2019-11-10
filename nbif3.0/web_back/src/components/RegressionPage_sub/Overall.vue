<template>
  <el-tabs v-model="activeProj" type="card" @tab-click="handleClick">
    <el-tab-pane 
      v-for="oneproject in projects"
      :label="oneproject.projectname" 
      :name="oneproject.projectname"
    >
      <OneprojPage
        v-bind:projectname="oneproject.projectname"
      >
      </OneprojPage>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import OneprojPage  from '@/components/RegressionPage_sub/Overall_sub/OneprojPage.vue'
export default {
  name: 'Overall',
  props: {
  },
  components  : {
    OneprojPage
  },
  data() {
    return {
      projects    : [],
      activeProj  : 'mi200',
      testdetails : [],
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
    handleClick(tab, event) {
      console.log(this.activeProj + ' clicked');
      //this.regressionstatus(this.activeProj);
    },
  },
  mounted (){
    //this.regressionstatus(this.activeProj);
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
