<template>
  <div>
    <el-table
      :data="regressionstatus_disp"
      border
      style="width: 100%"
      height="500"
      :row-class-name="selectedRegression"
    >
      <el-table-column
        prop="kickoffdate"
        label="kickoffdate"
        sortable
      >
        <template slot-scope="scope">
          <el-button type="text" @click="regressionclicked(scope.row)">{{scope.row.kickoffdate}}</el-button>
        </template>
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
      </el-table-column>
      <el-table-column
        prop="passnum"
        label="passnum"
      >
      </el-table-column>
      <el-table-column
        prop="failnum"
        label="failnum"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="gettestdetails('FAIL','all',scope.row);selectedRegressionIndex = scope.$index">{{scope.row.failnum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="unknownnum"
        label="unknownnum"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="gettestdetails('UNKNOWN','all',scope.row);selectedRegressionIndex = scope.$index">{{scope.row.unknownnum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="runningnum"
        label="notfinished"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="gettestdetails('RUNNING','all',scope.row);selectedRegressionIndex = scope.$index">{{scope.row.runningnum}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr />
    <div v-if="regressionselected">
      <el-tabs v-model="currentDVgroup" @tab-click="dvgroupclicked()">
        <el-tab-pane 
          v-for="oneDVgrp in alldvgroups"
          :label="oneDVgrp" 
          :name="oneDVgrp"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :title="title" :visible.sync="visible" width="90%">
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
        <el-table-column label="reproduce(TODO)" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Oneprojoneregress  from '@/components/RegressionPage_sub/Overall_sub/OneprojPage_sub/Oneprojoneregress.vue'
export default {
  name: 'OneprojPage',
  props: {
    projectname : ''
  },
  data() {
    return {
      alldvgroups : [
        'HOST',
        'DMA',
        'MISC',
        'OTHERS',
        'PERF'
      ],
      currentDVgroup  : 'HOST',
      currentregression : {},
      regressionselected  : false,
      loading : false,
      regressionstatus_disp: [],
      testdetails          : [],
      testdetails_disp     : [],
      visible : false,
      groupstatus: [],
      title : '',
      pagesize : 500,
      selectedRegressionIndex : '',
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
      oneregressioninfo : {
        projectname : '',
        variantname : '',
        changelist  : '',
        shelve      : '',
        isBAPU      : '',
        kickoffdate : ''
      }
    }
  },
  watch : {
    visible : function(oldv,newv){
      if(newv == false){
        this.searchparam.testnamesrch = '';
        this.searchparam.sigsrch      = '';
      }
    },
    projectname : function(oldv,newv){
      this.regressionstatus(this.projectname);
    }
  },
  components  : {
    Oneprojoneregress
  },
  methods : {
    regressionclicked(info){
      this.regressionselected = true;
      this.currentregression  = JSON.parse(JSON.stringify(info));
      console.log(this.currentregression.kickoffdate);
    },
    summary(projectname,variantname,changelist,isBAPU,shelve,kickoffdate){
      this.$http.post('/regression/summary',{
        projectname : projectname,
        variantname : variantname,
        isBAPU      : isBAPU,     
        kickoffdate : kickoffdate,
        changelist  : changelist, 
        shelve      : shelve,
      }).then(
        function(response){
          alert(response.body.ok);
        },
        function(){}
      );
    },
    neverpassupload(info){
      console.log(info);
    },
    neverpassClassname({row,rowIndex}){
    },
    selectedRegression({row,rowIndex}){
      if(rowIndex ==  this.selectedRegressionIndex){
        return 'success-row';
      }
      return '';
    },
    handleCurrentChange (val){
      console.log(val);
      this.testdetails_disp=[];
      let maxindex;
      if((val*this.pagesize)<this.testdetails.length){
        maxindex = (val*this.pagesize);
      }
      else{
        maxindex = this.testdetails.length;
      }
      for(let i=((val-1)*this.pagesize);i<maxindex;i++){
        this.testdetails_disp.push(this.testdetails[i]);
      }
    },
    getgroupstatus(projectname,variantname,changelist,isBAPU,shelve,kickoffdate){
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //setTimeout(() => {
      //  loading.close();
      //}, 2000);

      console.log('method : groupstatus');
      this.oneregressioninfo.projectname = projectname;
      this.oneregressioninfo.variantname = variantname;
      this.oneregressioninfo.changelist  = changelist;
      this.oneregressioninfo.isBAPU      = isBAPU;
      this.oneregressioninfo.shelve      = shelve;
      this.oneregressioninfo.kickoffdate = kickoffdate;
      this.$http.post('/regression/groupstatus',{
        kind  : 'all',
        projectname : projectname,
        variantname : variantname,
        changelist  : changelist,
        isBAPU      : isBAPU,
        shelve      : shelve,
        kickoffdate : kickoffdate
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body.groupstatus);
            console.log(typeof(response.body.groupstatus));
            this.groupstatus= response.body.groupstatus;
          }
          else{
            console.log(response.body);
          }
            this.loading.close();
        },
        function(){
          this.loading.close();
        },
      );
    },
    gettestdetails  (kind,groupname,info){
      this.searchparam.kind         = kind;
      this.searchparam.projectname  = info.projectname;
      this.searchparam.variantname  = info.variantname;
      this.searchparam.groupname    = groupname;
      this.searchparam.changelist   = info.changelist;
      this.searchparam.isBAPU       = info.isBAPU;
      this.searchparam.shelve       = info.shelve;
      this.searchparam.kickoffdate  = info.kickoffdate;
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
          else if(kind == 'RUNNING'){
            this.title  = 'RUNNING tests list'
          }
        },
        function(){}
      );
    },
    regressionstatus(projectname){
      this.$http.post('/regression/allstatus',{
        projectname : projectname
      }).then(
        function(response){
          if(response.body.ok =='ok'){
            this.regressionstatus_disp=  response.body.regressions;
          }
          else{
            console.log(response.body);
          }
        },
        function(){}
      );
    },
    neverpasscasesget(projectname){
      this.neverpasscases = [];
      console.log('neverpasscasesget');
      console.log(projectname);
      this.$http.post('/regression/neverpass',{
        kind  : 'getall',
        projectname : projectname
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.neverpasscases = JSON.parse(response.body.neverpasscases);
          }
        }
      );
    }
  },
  mounted (){
    this.regressionstatus(this.projectname);
  },
  updated (){
    //this.regressionstatus(this.projectname);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
