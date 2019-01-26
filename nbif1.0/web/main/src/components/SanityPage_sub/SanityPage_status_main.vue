<template>
  <el-container>
    <el-table
      :data="sanityStatus"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="testname"
        label="Test Name"
      >
      </el-table-column>
      <el-table-column
        prop="lastCL"
        label="Last Changelist"
      >
      </el-table-column>
      <el-table-column
        prop="lastpassCL"
        label="Last Passing Changelist"
      >
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'SanityPage_status_main',
  props: {
    variants  : Array,
    testplans : Array,
    projects  : Array,
    projectinfo : {}
  },
  data() {
    return {
      sanityStatus  : [],
    }
  },
  watch : {
    projectinfo : function(val,oldval){
      console.log('abc');
      this.$http.post('/sanitys/get',{
        kind  : 'allsanitysget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
          }
        },
        function(){}
      );
    }
  },
  methods : {
  },
  mounted : function(){
    console.log('mounted');
    console.log(this.projectinfo);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
