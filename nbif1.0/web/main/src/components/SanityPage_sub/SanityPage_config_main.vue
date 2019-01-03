<template>
  <el-container>
    <el-container>
      <el-header>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary"
              @click="add()"
            >
            Add
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="upload()"
            >
            Upload
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">
            CloneFrom:
            </el-button>
          </el-form-item>
          <el-form-item label="ProjectName">
            <el-select v-model="projectinfo.projectname" placeholder="ProjectName">
              <el-option 
                v-for="oneproject in projects" 
                :label="oneproject.name" 
                :value="oneproject.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="VariantName">
            <el-select v-model="projectinfo.variantname" placeholder="VariantName">
              <el-option 
                v-for="onevariant in variants" 
                :label="onevariant.variantname" 
                :value="onevariant.variantname"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table
          :data="sanitys_display"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="testname"
            label="TestName"
          >
            <template slot-scope="scope">
              <el-input
                placeholder="TestName"
                v-model="scope.row.testname"
                clearable>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
          fixed="right"
          label="operation"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, sanitys_display)"
              type="text"
              size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'SanityPage_config_main',
  props: {
    variants  : Array,
    testplans : Array,
    projects  : Array,
    projectinfo : {}
  },
  data() {
    return {
      sanitys : []
    }
  },
  computed  : {
    sanitys_display () {
      var items = [];
      console.log(this.sanitys);
      for(var i=0;i<this.sanitys.length;i++){
        if((this.sanitys[i].projectname  == this.projectinfo.projectname) && (this.sanitys[i].variantname == this.projectinfo.variantname)){
          items.push( this.sanitys[i]);
        }
      }
      console.log(items);
      return items;
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    get () {
      //Sanitys get info
      this.$http.post('/sanitys/get',{
        kind  : 'allsanitysget'
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            this.sanitys  =[];
            for(var i = 0; i<response.body.sanitys.length; i++){
              this.sanitys.push({
                testname    : response.body.sanitys[i].testname,
                projectname : response.body.sanitys[i].projectname,
                variantname : response.body.sanitys[i].variantname
              });
            }
          }
        },
        function(){}
      );
    },
    add () {
      console.log(this.projectinfo.projectname);
      console.log(this.projectinfo.variantname);
      this.sanitys.unshift({
        variantname     : this.projectinfo.variantname,
        projectname     : this.projectinfo.projectname,
        testname        : ''
      });
    },
    upload () {
      console.log('upload');
      for(var i=0;i<this.sanitys.length;i++){
        console.log(this.sanitys_display[i].testname);
      }
      this.$http.post('/sanitys/upload',{
        kind    : 'sanity_test_upload',
        sanitys : JSON.stringify(this.sanitys_display)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log('ok');
          }
          this.get();
          alert('uploaded');
        },
        function(){}
      );
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
