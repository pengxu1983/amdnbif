<template>
  <el-container>
    <el-col :span=24>
      <el-row>
        <el-button type="primary" round @click='add()'>Add</el-button>
        <el-button type="primary" round @click='upload()'>Upload</el-button>
      </el-row>
      <el-table
        :data="users"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="realname"
          label="realname"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="realname"
              v-model="scope.row.realname"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="email"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="email"
              v-model="scope.row.email"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="groupname"
          label="groupname"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.groupname" placeholder="GroupName">
              <el-option 
                v-for="onegroup in groups" 
                :label="onegroup" 
                :value="onegroup"
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
              @click.native.prevent="deleteRow(scope.$index, users)"
              type="text"
              size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-container>
</template>

<script>
export default {
  name: 'ConfigPage_users_main',
  props: {
  },
  data () {
    return {
      users : [],
      groups  : [
        'FTE',
        'Contractor'
      ] //TODO  need to get from DB
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    upload () {
      console.log('upload');
      for(var i=0;i<this.users.length;i++){
        console.log(this.users[i].realname);
        console.log(this.users[i].email);
      }
      this.$http.post('/config/upload',{
        kind  : 'usersupload',
        users : this.users 
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
    add () {
      this.users.push({
        realname  : '',
        email     : ''
      });
    },
    get () {
      this.$http.post('/config/get',{
        kind  : 'allusersget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.users  = [];
            for(var userindex = 0; userindex < response.body.users.length; userindex++){
              this.users.push({
                realname  : response.body.users[userindex].realname,
                email     : response.body.users[userindex].email,
                groupname : response.body.users[userindex].groupname,
              });
            }
          }
        },
        function(){}
      );
    }
  },
  mounted  () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
