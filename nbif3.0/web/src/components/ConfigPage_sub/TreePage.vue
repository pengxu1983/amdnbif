<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">NBIF Main Page</a>
      </nav>
    </el-header>
    <el-main>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button 
              type="primary"
              @click="add()"
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
          :data="trees"
          border
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="projectname"
            label="projectname"
            width="150"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.projectname" placeholder="projectname">
                <el-option 
                  v-for="oneproject in projects"
                  :label="oneproject.projectname" 
                  :value="oneproject.projectname"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="treeRoot"
            label="treeRoot"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.treeRoot"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="site"
            label="site"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.site" placeholder="site">
                <el-option 
                  v-for="onesite in sites"
                  :label="onesite" 
                  :value="onesite"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="branchname"
            label="branchname"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.branchname"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="codeline"
            label="codeline"
            width="200"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.codeline"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="isValid"
            label="isValid"
            width="150"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.isValid" placeholder="isValid">
                <el-option 
                  v-for="oneopt in options"
                  :label="oneopt" 
                  :value="oneopt"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkmask"
            label="checkmask"
            width="150"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="opt"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, trees)"
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
  name: 'TreePage',
  props: {
  },
  data() {
    return {
      trees     : [],
      projects  : [],
      sites : [
        'atl',
        'cyb',
        'srdc'
      ],
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
    add(){
      this.trees.unshift({
        projectname : '',
        isValid     : 'yes',
        treeRoot    : '',
        site        : 'atl',
        branchname  : '',
        codeline    : 'nbif2_0',
        checkmask   : {}
      });
    },
    upload(){
      let T = [];
      for(let t =0;t<this.trees.length;t++){
        if(
          (this.trees[t].projectname == '') ||
          (this.trees[t].treeRoot    == '') 
        ){
          continue;
        }
        else{
          T.push(this.trees[t]);
        }
      }
      this.$http.post('/config/trees/upload',{
        kind  : 'all',
        trees : JSON.stringify(T)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            alert('trees uploaded');
          }
        },
        function(){}
      );
    },
    getinfo(){
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
      this.$http.post('/config/trees/get',{
        kind  : 'all'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log('all trees info get');
            this.trees  = JSON.parse(response.body.trees);
          }
        },
        function(){}
      );
    }
  },
  mounted (){
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
