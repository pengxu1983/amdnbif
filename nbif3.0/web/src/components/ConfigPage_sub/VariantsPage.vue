<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">NBIF Main Page</a>
      </nav>
    </el-header>
    <el-main>
      <el-row>
        <el-button 
          type="primary"
          @click="add()"
        >add</el-button>
        <el-button 
          type="primary"
          @click="upload()"
        >upload</el-button>
      </el-row>
      <el-row>
      <el-table
        border
        :data="variants"
        style="width: 100%"
        max-height="250">
        <el-table-column
          fixed
          prop="variantname"
          label="variant"
        >
        <template slot-scope="scope">
          <el-input v-model="scope.row.variantname"></el-input>
        </template>
        </el-table-column>
        <el-table-column
          prop="isSanity"
          label="isSanity"
          width="200"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.isSanity" clearable placeholder="yes or no">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="isValid"
          label="isValid"
          width="200"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.isValid" clearable placeholder="yes or no">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="operation"
          width="200">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'VariantsPage',
  props: {
  },
  data() {
    return {
      variants  : [],
      options : [
        'yes',
        'no'
      ]
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add (){
      this.variants.unshift({
        variantname : '',
        isSanity    : 'no',
        isValid     : 'yes'
      });
    },
    upload  (){
      this.$http.post('/config/variants/upload',{
        kind  : 'all',
        variants  : JSON.stringify(this.variants)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            alert(response.body.msg);
          }
          else if(response.body.ok ==  'notok'){
            alert(response.body.msg);
          }
        },
        function(){}
      );
    },
    get (){
      //get variants
      this.$http.post('/config/variants/get',{
        kind  : 'all'
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.variants = JSON.parse(response.body.variants);
            console.log('all variants successfully get from DB');
          }
          else{
          }
        },
        function(){}
      );
    }
  },
  mounted  (){
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
