<template>
  <el-container>
    <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
      <el-form-item label="ProjectName">
        <el-select v-model="projectinfo.projectname" placeholder="ProjectName">
          <el-option 
            v-for="oneproject in projects" 
            :label="oneproject" 
            :value="oneproject"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VariantName">
        <el-select v-model="projectinfo.variantname" placeholder="VariantName">
          <el-option 
            v-for="onevariant in variants" 
            :label="onevariant" 
            :value="onevariant"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Check</el-button>
        <el-button type="primary">Check</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <el-table
      :data="testplans"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="name"
        label="TestplanName"
      >
        <template slot-scope="scope">
          <el-input
            placeholder="TestplanName"
            v-model="scope.row.name"
            clearable>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectname"
        label="ProjectName"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.projectname" placeholder="ProjectName">
            <el-option 
              v-for="oneproject in projects" 
              :label="oneproject" 
              :value="oneproject"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="projectname"
        label="ProjectName"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.projectname" placeholder="ProjectName">
            <el-option 
              v-for="oneproject in projects" 
              :label="oneproject" 
              :value="oneproject"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="operation"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, testplans)"
            type="text"
            size="small">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'ConfigPage_testplans_main',
  props: {
  },
  data () {
    return {
      projectinfo : {
        projectname : 'NV21',
        variantname : 'nbif_nv10_gpu',
      },
      variants  : [
        'nbif_nv10_gpu',
        'nbif_oak_gpu',
        'nbif_vg20_gpu',
        'nbif_ssp_ntb',
        'nbif_ssp_generic_a',
        'nbif_ssp_generic_b',
        'nbif_al_gpu',
      ],
      projects  : [
        'NV21',
        'MI200',
        'MERO',
        'FLOYD'
      ],
      users : [],
      testplans : []
    }
  },
  methods : {
    get () {
      //Users info get
      this.$http.post('/config/get',{
        kind  : 'allusersget'
      }).then(
        function(response){
          if(response.body.ok=='ok'){
            this.users  = [];
            for(var i = 0;i<response.body.users.length;i++){
              this.users.push({
                realname  : response.body.users[i].realname,
                email     : response.body.users[i].email
              });
            }
          }
        },
        function(){}
      );
      //Projects info get
      this.$http.post('/config/get',{
        kind  : 'allprojectsget'
      }).then(
        function(response){
          if(response.body.ok=='ok'){
            this.projects = [];
            for(var i = 0;i<response.body.projects.length;i++){
              this.projects.push({
                name      : response.body.projects[i].name,
              });
            }
          }
        },
        function(){}
      );
      //Variants info get
      this.$http.post('/config/get',{
        kind  : 'allvariantsget'
      }).then(
        function(response){
          if(response.body.ok=='ok'){
            this.variants = [];
            for(var i = 0;i<response.body.variants.length;i++){
              this.variants.push({
                variantname : response.body.variants[i].variantname
              });
            }
          }
        },
        function(){}
      );
      //Testplans info get
      this.$http.post('/config/get',{
        kind  : 'alltestplansget'
      }).then(
        function(response){
          if(response.body.ok=='ok'){
            this.testplans= [];
            for(var i = 0;i<response.body.testplans.length;i++){
              this.testplans.push({
                name  : response.body.testplans[i].name
              });
            }
          }
        },
        function(){}
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
