<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item label="Project">
            <el-select v-model="projectinfo.projectname" placeholder="Project" @change="getprojects()">
              <el-option 
                v-for="oneproject in projects"
                :label="oneproject.projectname" 
                :value="oneproject.projectname"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Variant">
            <el-select v-model="projectinfo.variantname" placeholder="Variant" @change="getgroups()">
              <el-option 
                v-for="onevariant in validvariants"
                :label="onevariant" 
                :value="onevariant"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="isBAPU">
            <el-select v-model="projectinfo.isBAPU" placeholder="BAPU" @change="getgroups()">
              <el-option 
                v-for="item in options"
                :label="item" 
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="isBACO">
            <el-select v-model="projectinfo.isBACO" placeholder="BACO" @change="getgroups()">
              <el-option 
                v-for="item in options"
                :label="item" 
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
          border
          :data="groups"
          style="width: 100%"
        >
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
              <el-select
                v-model="scope.row.owner"
                filterable
                remote
                reserve-keyword
                placeholder="name contains"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in users"
                  :key="item.realname"
                  :label="item.realname"
                  :value="item.realname">
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
                @click.native.prevent="deleteRow(scope.$index, groups)"
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
      options : [
        'yes',
        'no'
      ],
      groups  : [],
      DVgroups: [
        'MISC',
        'DMA',
        'HOST'
      ],
      users   : [],
      loading : false,
      projectinfo : {
        projectname : 'mi200',
        variantname : 'nbif_nv10_gpu',
        isBACO      : 'no',
        isBAPU      : 'no'
      },
      projects  : [],
      validvariants : []
    }
  },
  methods : {
    remoteMethod(query){
      this.loading  = true;
      if(query !== ''){
        this.$http.post('/config/users/get',{
          kind  : 'search',
          query : query
        }).then(
          function(response){
            this.loading  = false;
            if(response.body.ok ==  'ok'){
              console.log(response.body);
              this.users  = JSON.parse(response.body.users);
            }
          },
          function(){}
        );
      }
      else{
        this.users  = [];
      }
    },
    gotohome  (){
      this.$router.push({
        name  : 'home'
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    add (){
      this.groups.unshift({
        groupname   : '',
        DVgroup     : '',
        owner       : '',
        projectname : this.projectinfo.projectname,
        variantname : this.projectinfo.variantname,
        isBACO      : 'no',
        isBAPU      : 'no'
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
    getprojects (){
      this.projects = [];
      this.validvariants  = [];
      this.$http.post('/config/projects/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            //console.log(response.body.projects);
            console.log('all projects successfully get from DB');
            this.projects = JSON.parse(response.body.projects);
            for(let p=0;p<this.projects.length;p++){
              if(this.projects[p].projectname ==  this.projectinfo.projectname){
                console.log(this.projectinfo.projectname);
                console.log(this.projects[p].validvariants);
                this.validvariants  = this.projects[p].validvariants;
                this.projectinfo.variantname  = this.validvariants[0];
                this.getgroups();
                break;
              }
            }
          }
        },
        function(){}
      );
    },
    getgroups (){
      this.groups = [];
      //get groups
      this.$http.post('/config/groups/get',{
        kind  : 'Bygrp',
        projectname : this.projectinfo.projectname,
        variantname : this.projectinfo.variantname,
        isBAPU      : this.projectinfo.isBAPU,
        isBACO      : this.projectinfo.isBACO
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.groups= JSON.parse(response.body.groups);
            console.log(response.body.groups);
            console.log('Project : '+this.projectinfo.projectname+ ' groups successfully get from DB');
          }
          else{
          }
        },
        function(){}
      );
    },
    get (){
      console.log('get');
      console.log(this.projectinfo);
      this.groups = [];
      //get groups
      this.$http.post('/config/groups/get',{
        kind  : 'Bygrp',
        projectname : this.projectinfo.projectname,
        variantname : this.projectinfo.variantname
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.groups= JSON.parse(response.body.groups);
            console.log(response.body.groups);
            console.log('Project : '+this.projectinfo.projectname+ ' groups successfully get from DB');
          }
          else{
          }
        },
        function(){}
      );
      this.projects = [];
      this.validvariants  = [];
      this.$http.post('/config/projects/get',{
        kind  : 'all',
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            //console.log(response.body.projects);
            console.log('all projects successfully get from DB');
            this.projects = JSON.parse(response.body.projects);
            for(let p=0;p<this.projects.length;p++){
              if(this.projects[p].projectname ==  this.projectinfo.projectname){
                console.log(this.projectinfo.projectname);
                console.log(this.projects[p].validvariants);
                this.validvariants  = this.projects[p].validvariants;
                this.projectinfo.variantname  = this.validvariants[0];
                break;
              }
            }
          }
        },
        function(){}
      );
    }
  },
  mounted  (){
    this.getgroups();
    this.getprojects();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
