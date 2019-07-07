<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button 
              type="primary"
              @click="projectadd()"
            >add</el-button>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary"
              @click="upload()"
            >upload</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table
          :data="projects"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="projectname"
            label="projectname"
          >
          </el-table-column>
          <el-table-column
            prop="validvariants"
            label="validvariants"
          >
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.validvariants" >
                <div>
                  <el-checkbox v-for="onevariant in variants" :label="onevariant.variantname" :key="onevariant">{{onevariant.variantname}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="milestones"
            label="milestones">
          </el-table-column>
          <el-table-column
            prop="ownerships"
            label="ownerships">
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ProjectsPage',
  props: {
  },
  data() {
    return {
      variants  : [],
      projects  : [],
      users     : []
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
      )
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    projectadd (){
      let oneproject  = {
        projectname : '',
        validvariants : [],
        milestones  : [
          {
            milestonename : 'LSA',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSB',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSC',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSD',
            droptime      : '',
            integratetime : ''
          }
        ],
        ownerships  : {}
      };
      this.projects.unshift(oneproject);
    }
  },
  mounted  (){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
