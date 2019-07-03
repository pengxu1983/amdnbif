<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" >NBIF Main Page</a>
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
        :data="groups"
        style="width: 100%"
        max-height="250">
        <el-table-column
          fixed
          prop="groupname"
          label="Feature Group"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.groupname"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="DVgroup"
          label="DVgroup"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.DVgroup" clearable placeholder="DVgroup">
              <el-option
                v-for="item in DVgroups"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="owner"
          label="Owner"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.owner" clearable placeholder="Owner">
              <el-option
                v-for="item in users"
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
  name: 'GroupsPage',
  props: {
  },
  data() {
    return {
      groups  : [],
      DVgroups: [
        'MISC',
        'DMA',
        'HOST'
      ],
      users   : []
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add (){
      this.groups.unshift({
        groupname   : '',
        DVgroup     : '',
        owner       : ''
      });
    },
    upload  (){
      this.$http.post('/config/groups/upload',{
        kind  : 'all',
        groups : JSON.stringify(this.groups)
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
      //get groups
      this.$http.post('/config/groups/get',{
        kind  : 'all'
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.groups= JSON.parse(response.body.groups);
            console.log('all groups successfully get from DB');
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
