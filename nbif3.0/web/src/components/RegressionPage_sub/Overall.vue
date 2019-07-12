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
      projects  : [],
      activeProj: 'mi200',
      regressionstatus_mi200  : [],
      testdetails             : [],
      testdetails_disp        : [],
      faillistvisible_mi200   : false,
      unknownlistvisible_mi200: false,
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
            console.log(response.body.projects);
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
    getgroupstatus(projectname,variantname,changelist,isBAPU,isBACO,shelve){
      this.$http.post('/regression/groupstatus',{
        kind  : 'all',
        projectname : projectname,
        variantname : variantname,
        changelist  : changelist,
        isBAPU      : isBAPU,
        isBACO      : isBACO,
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
    gettestdetails  (kind,projectname,variantname,groupname,changelist,isBAPU,isBACO,shelve){
      if(kind == 'FAIL'){
        this.faillistvisible_mi200 = true;
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
        this.unknownlistvisible_mi200 = true;
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
    handleClick(tab, event) {
      console.log(this.activeProj + ' clicked');
      //this.regressionstatus(this.activeProj);
    },
    regressionstatus(projectname){
      this.$http.post('/regression/get',{
        kind  : 'Overall',
        projectname : projectname
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            this.regressionstatus_mi200 =  response.body.regressions;
            console.log(this.regressionstatus_mi200);
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
    //this.regressionstatus(this.activeProj);
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
