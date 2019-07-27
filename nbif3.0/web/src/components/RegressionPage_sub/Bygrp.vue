<template>
  <el-container>
    <el-header>
    <el-form :inline="true" :model="groupinfo" class="demo-form-inline">
      <el-form-item label="Project">
        <el-select v-model="groupinfo.projectname" placeholder="projectname" @change="projectchange()">
          <el-option 
            v-for="oneproject in projects"
            :label="oneproject.projectname" 
            :value="oneproject.projectname"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Group">
        <el-select v-model="groupinfo.groupname" placeholder="groupname">
          <el-option 
            v-for="onegroup in groups"
            :label="onegroup.groupname" 
            :value="onegroup.groupname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="isBAPU">
        <el-select v-model="groupinfo.isBAPU" placeholder="isBAPU">
          <el-option label="yes" value="yes" ></el-option>
          <el-option label="no" value="no" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getregressionstatus(groupinfo.projectname,groupinfo.groupname,groupinfo.isBAPU)">check</el-button>
      </el-form-item>
    </el-form>
    </el-header>
    <el-main>
      <el-table
        :data="regressionstatus"
        border
        style="width: 100%">
        <el-table-column
          prop="kickoffdate"
          label="kickoffdate"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="variantname"
          label="variantname"
        >
        </el-table-column>
        <el-table-column
          prop="changelist"
          label="changelist"
        >
        </el-table-column>
        <el-table-column
          prop="isBAPU"
          label="isBAPU"
        >
        </el-table-column>
        <el-table-column
          prop="shelve"
          label="shelve"
        >
        </el-table-column>
        <el-table-column
          prop="passrate"
          label="passrate"
        >
        </el-table-column>
        <el-table-column
          prop="alltestnum"
          label="alltestnum"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="gettestdetails('ALL',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.alltestnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="passnum"
          label="passnum">
          <template slot-scope="scope">
            <el-button type="text" @click="gettestdetails('PASS',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.passnum}}</el-button>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column
          prop="failnum"
          label="failnum">
          <template slot-scope="scope">
            <el-button type="text" @click="gettestdetails('FAIL',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.failnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="unknownnum"
          label="unknownnum">
          <template slot-scope="scope">
            <el-button type="text" @click="gettestdetails('UNKNOWN',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.unknownnum}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="visible" width="80%">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="testdetails.length">
        </el-pagination>
        <el-form :inline="true" :model="searchparam" class="demo-form-inline">
          <el-form-item label="testname contains">
            <el-input v-model="searchparam.testnamesrch" placeholder="testname contains"></el-input>
          </el-form-item>
          <el-form-item label="signature contains">
            <el-input v-model="searchparam.sigsrch" placeholder="signature contains"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="gettestdetails(searchparam.kind,searchparam.projectname,searchparam.variantname,searchparam.groupname,searchparam.changelist,searchparam.isBAPU,searchparam.shelve,searchparam.kickoffdate)">Filter</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="testdetails_disp" style="width: 100%">
          <el-table-column property="testname" label="testname" width="200"></el-table-column>
          <el-table-column property="seed" label="seed" width="200"></el-table-column>
          <el-table-column property="signature" label="signature"></el-table-column>
        </el-table>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Bygrp',
  props: {
  },
  data() {
    return {
      groupinfo : {
        projectname : 'mi200',
        groupname   : 'sanity',
        variantname : 'nbif_nv10_gpu',
        isBAPU      : 'no'
      },
      groups  : [],
      regressionstatus    : [],
      testdetails         : [],
      testdetails_disp    : [],
      visible             : false,
      projects  : [],
      searchparam : {
        testnamesrch  : '',
        sigsrch: '',
        kind      : '',
        projectname:'',
        variantname:'',
        groupname : '',
        changelist: '',
        isBAPU    : '',
        shelve    : '',
        kickoffdate:''
      },
      pagesize : 500,
      title : '',
    }
  },
  methods : {
    getregressionstatus(projectname,groupname,isBAPU){
      this.regressionstatus = [];
      this.$http.post('/regression/get',{
        kind  : 'Bygrp',
        projectname : projectname,
        groupname : groupname,
        isBAPU    : isBAPU
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            this.regressionstatus=  response.body.regressions;
          }
          else{
            console.log(response.body);
          }
        },
        function(){}
      );
    },
    gettestdetails  (kind,projectname,variantname,groupname,changelist,isBAPU,shelve,kickoffdate){
      this.searchparam.testnamesrch = '';
      this.searchparam.sigsrch      = '';
      this.searchparam.kind         = kind;
      this.searchparam.projectname  = projectname;
      this.searchparam.variantname  = variantname;
      this.searchparam.groupname    = groupname;
      this.searchparam.changelist   = changelist;
      this.searchparam.isBAPU       = isBAPU;
      this.searchparam.shelve       = shelve;
      this.searchparam.kickoffdate  = kickoffdate;
      console.log('gettestdetails');
      console.log(kind);
      this.visible  = true;
      this.$http.post('/regression/testdetails',{
        projectname : this.searchparam.projectname,
        variantname : this.searchparam.variantname,
        groupname   : this.searchparam.groupname,
        changelist  : this.searchparam.changelist,
        isBAPU      : this.searchparam.isBAPU,
        shelve      : this.searchparam.shelve,
        kickoffdate : this.searchparam.kickoffdate,
        kind        : 'testdetails',
        result      : this.searchparam.kind,
        testnamesrch: this.searchparam.testnamesrch,
        sigsrch     : this.searchparam.sigsrch
      }).then(
        function(response){
          console.log(kind);
          console.log(response.body.testdetails);
          this.testdetails = response.body.testdetails;
          this.handleCurrentChange(1);
          if(kind       == 'FAIL'){
            this.title  = 'FAIL tests list'
          }
          else if(kind  == 'UNKNOWN'){
            this.title  = 'UNKNOWN tests list'
          }
          else if(kind  ==  'PASS'){
            this.title  = 'PASS tests list'
          }
          else if(kind  ==  'ALL'){
            this.title  = 'ALL tests list'
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
    projectchange(){
      //get groups
      this.$http.post('/config/groups/get',{
        kind  : 'Bygrp',
        projectname : this.groupinfo.projectname,
        variantname : this.groupinfo.variantname,
        isBAPU      : this.groupinfo.isBAPU
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.groups= JSON.parse(response.body.groups);
            console.log('Project : '+this.groupinfo.projectname+ ' groups successfully get from DB');
          }
          else{
          }
        },
        function(){}
      );
    },
    getinfo (){
      //get groups
      this.$http.post('/config/groups/get',{
        kind  : 'Bygrp',
        projectname : this.groupinfo.projectname,
        variantname : this.groupinfo.variantname,
        isBAPU      : this.groupinfo.isBAPU
      }).then(
        function(response){
          if(response.body.ok == 'ok'){
            this.groups= JSON.parse(response.body.groups);
            console.log('Project : '+this.groupinfo.projectname+ ' groups successfully get from DB');
          }
          else{
          }
        },
        function(){}
      );
      //get projects
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
    }
  },
  mounted (){
    this.getregressionstatus(this.groupinfo.projectname,this.groupinfo.groupname,this.groupinfo.isBAPU);
    this.getinfo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
