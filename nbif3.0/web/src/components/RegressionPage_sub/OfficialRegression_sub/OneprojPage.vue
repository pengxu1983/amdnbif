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
          <el-button type="text" @click="regressionclicked(scope.row);selectedRegressionIndex = scope.$index">{{scope.row.kickoffdate}}</el-button>
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
        label="passrate(%)"
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
        <template slot-scope="scope">
          <el-button type="text" @click="isDVgrp  = false;gettestdetails('PASS','all',scope.row,false);selectedRegressionIndex = scope.$index">{{scope.row.passnum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="failnum"
        label="failnum"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="isDVgrp  = false;gettestdetails('FAIL','all',scope.row,false);selectedRegressionIndex = scope.$index">{{scope.row.failnum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="unknownnum"
        label="unknownnum"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="isDVgrp  = false;gettestdetails('UNKNOWN','all',scope.row,false);selectedRegressionIndex = scope.$index">{{scope.row.unknownnum}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="runningnum"
        label="notfinished"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="isDVgrp  = false;gettestdetails('RUNNING','all',scope.row,false);selectedRegressionIndex = scope.$index">{{scope.row.runningnum}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr />
    <div v-if="regressionselected">
      <el-tabs v-model="currentDVgroup" @tab-click="dvgroupclicked">
        <el-tab-pane 
          v-for="oneDVgrp in alldvgroups"
          :key="oneDVgrp"
          :label="oneDVgrp" 
          :name="oneDVgrp"
        >
        </el-tab-pane>
      </el-tabs>
      <el-table
        :data="DVgroupstatus"
        border
        style="width: 100%">
        <el-table-column
          prop="testlist"
          label="alltestnum"
        >
        </el-table-column>
        <el-table-column
          prop="passlist"
          label="passnum"
        >
        </el-table-column>
        <el-table-column
          prop="faillist"
          label="failnum"
        >
        </el-table-column>
        <el-table-column
          prop="unknownlist"
          label="unknownnum"
        >
        </el-table-column>
        <el-table-column
          prop="runninglist"
          label="notfinished"
        >
        </el-table-column>
        <el-table-column
          prop="passrate"
          label="passrate(%)"
        >
        </el-table-column>
      </el-table>
      <hr />
      <el-table
        :data="currentDVgroupstatus"
        border
        style="width: 100%"
        height="500"
      >
        <el-table-column
          prop="groupname"
          label="feature"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="owner"
          label="owner"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="allnum"
          label="alltestnum"
          :sortable="true"
          :sort-method="sortbynumberallnum"
        >
        </el-table-column>
        <el-table-column
          prop="passnum"
          label="passnum"
          :sortable="true"
          :sort-method="sortbynumberpassnum"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="isDVgrp  = true;gettestdetails('PASS',scope.row.groupname,scope.row,false)">{{scope.row.passnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="failnum"
          label="failnum"
          :sortable="true"
          :sort-method="sortbynumberfailnum"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="isDVgrp  = true;gettestdetails('FAIL',scope.row.groupname,scope.row,false)">{{scope.row.failnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="unknownnum"
          label="unknownnum"
          :sortable="true"
          :sort-method="sortbynumberunknownnum"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="isDVgrp  = true;gettestdetails('UNKNOWN',scope.row.groupname,scope.row,false)">{{scope.row.unknownnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="runningnum"
          label="notfinished"
          :sortable="true"
          :sort-method="sortbynumberrunningnum"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="isDVgrp  = true;gettestdetails('RUNNING',scope.row.groupname,scope.row,false)">{{scope.row.runningnum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="passrate"
          label="passrate(%)"
          :sortable="true"
          :sort-method="sortbynumberpassrate"
        >
        </el-table-column>
      </el-table>
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
          <el-button type="primary" @click="gettestdetails(searchparam.result,searchparam.groupname,searchparam,true)">Filter</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="testdetails_disp" style="width: 100%" border>
        <el-table-column property="testname" label="testname" width="200"></el-table-column>
        <el-table-column property="seed" label="seed" width="200"></el-table-column>
        <el-table-column property="signature" label="signature"></el-table-column>
        <el-table-column label="reproduce(TODO)" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OneprojPage',
  props: {
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
      DVgroupstatus : [],
      currentregression : {},
      currentDVgroup  : 'HOST',
      currentgroup    : '',
      regressionselected  : false,
      loading : false,
      regressionstatus_disp: [],
      testdetails          : [],
      testdetails_disp     : [],
      visible : false,
      currentDVgroupstatus: [],
      title : '',
      pagesize : 500,
      selectedRegressionIndex : '',
      searchparam : {},
      isDVgrp : false,
      oneregressioninfo : {
        projectname : '',
        variantname : '',
        changelist  : '',
        shelve      : '',
        isBAPU      : '',
        kickoffdate : ''
      },
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
      this.regressionselected = false;
    }
  },
  components  : {
  },
  methods : {
    sortbynumberrunningnum (a,b){
      console.log('runningnum');
      let an= Number(a.runningnum);
      let bn= Number(b.runningnum);
      if(an>bn){
        return 1;
      }
      if(an<bn){
        return -1;
      }
      return 0;
    },
    sortbynumberallnum(a,b){
      console.log('allnum');
      let an= Number(a.allnum);
      let bn= Number(b.allnum);
      if(an>bn){
        return 1;
      }
      if(an<bn){
        return -1;
      }
      return 0;
    },
    sortbynumberpassnum(a,b){
      console.log('passnum');
      let an= Number(a.passnum);
      let bn= Number(b.passnum);
      if(an>bn){
        return 1;
      }
      if(an<bn){
        return -1;
      }
      return 0;
    },
    sortbynumberfailnum(a,b){
      console.log('failnum');
      let an= Number(a.failnum);
      let bn= Number(b.failnum);
      if(an>bn){
        return 1;
      }
      if(an<bn){
        return -1;
      }
      return 0;
    },
    sortbynumberunknownnum(a,b){
      console.log('unknownnum');
      let an= Number(a.unknownnum);
      let bn= Number(b.unknownnum);
      if(an>bn){
        return 1;
      }
      if(an<bn){
        return -1;
      }
      return 0;
    },
    sortbynumberpassrate(a,b){
      console.log('passrate');
      let an= Number(a.passrate);
      let bn= Number(b.passrate);
      if(an>bn){
        return 1;
      }
      if(an<bn){
        return -1;
      }
      return 0;
    },
    dvgroupclicked (tab,event) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      console.log(this.currentDVgroup);
      this.$http.post('/regression/onedvgroupstatus',{
        kind  : 'one',
        projectname   : this.currentregression.projectname,
        variantname   : this.currentregression.variantname,
        kickoffdate   : this.currentregression.kickoffdate,
        isBAPU        : this.currentregression.isBAPU     ,
        changelist    : this.currentregression.changelist ,
        shelve        : this.currentregression.shelve     ,
        DVgroup       : this.currentDVgroup    ,
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body.DVgroupstatus);
            this.DVgroupstatus  = response.body.DVgroupstatus;
          }
          this.loading.close();
          this.getgroupstatus();
        },
        function(){
          this.loading.close();
        }
      );
    },
    regressionclicked(info){
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.regressionselected = true;
      this.currentregression  = JSON.parse(JSON.stringify(info));
      console.log(this.currentregression.kickoffdate);
      this.dvgroupclicked();
      this.loading.close();
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
    getgroupstatus(){
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      console.log('method : groupstatus');
      this.$http.post('/regression/groupstatus',{
        kind  : 'one',
        projectname : this.currentregression.projectname,
        variantname : this.currentregression.variantname,
        changelist  : this.currentregression.changelist,
        isBAPU      : this.currentregression.isBAPU,
        shelve      : this.currentregression.shelve,
        kickoffdate : this.currentregression.kickoffdate,
        DVgroup     : this.currentDVgroup
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log(response.body.groupstatus);
            console.log(typeof(response.body.groupstatus));
            this.currentDVgroupstatus= response.body.groupstatus;
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
    gettestdetails  (result,groupname,info,filter){
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });//display loading
      let W                   = JSON.parse(JSON.stringify(info));
      if(this.isDVgrp){
      }
      else{
        this.currentregression  = JSON.parse(JSON.stringify(info));
      }
      W.result       = result;
      W.groupname    = groupname;
      W.kind         = 'testdetails';
      if(filter){
      }
      else{
        W.sigsrch      = '';
        W.testnamesrch = '';
      }

      this.searchparam  = JSON.parse(JSON.stringify(W));
      console.log('gettestdetails');
      console.log(this.searchparam);
      this.$http.post('/regression/testdetails',W).then(
        function(response){
          this.testdetails = response.body.testdetails;
          console.log('fetched tests : '+this.testdetails.length);
          this.handleCurrentChange(1);
          this.visible  = true;
          this.loading.close();
          this.title  = result+' tests of '+info.kickoffdate+' '+info.projectname+' '+info.variantname;
          console.log('currentregression');
          console.log(this.currentregression);
        },
        function(){
          this.loading.close();
        }
      );
    },
    regressionstatus(projectname){
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
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
          this.loading.close();
        },
        function(){
          this.loading.close();
        }
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
