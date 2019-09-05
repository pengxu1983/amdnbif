<template>
  <div>
    <el-container>
      <el-main>
        <el-tabs v-model="selectedgroup" @tab-click="handleClick">
          <el-tab-pane 
            v-for="oneDVgroup in DVgroups"
            :label="oneDVgroup" 
            :name="oneDVgroup"
          >
          </el-tab-pane>
        </el-tabs>
        <el-table
          :data="DVsum"
          stripe
          border
          style="width: 100%"
        >
          </el-table-column>
          <el-table-column
            prop="allnum"
            label="alltestnum"
          >
          </el-table-column>
          <el-table-column
            prop="passnum"
            label="passtestnum"
          >
          </el-table-column>
          <el-table-column
            prop="failnum"
            label="failtestnum"
          >
          </el-table-column>
          <el-table-column
            prop="unknownnum"
            label="unknownnum"
          >
          </el-table-column>
          <el-table-column
            prop="runningnum"
            label="notfinished"
          >
          </el-table-column>
          <el-table-column
            prop="passrate"
            label="passrate"
          >
          </el-table-column>
        </el-table>
        <hr />
        <h2>Feature Group Summary</h2>
        <hr />
        <el-table
          :data="grpstatus"
          stripe
          border
          height="500"
          style="width: 100%">
          </el-table-column>
          <el-table-column
            prop="groupname"
            label="groupname"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="allnum"
            label="alltestnum"
            sortable
          >
            <template slot-scope="scope">
              <el-button type="text" @click="gettestdetails('ALL',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.alltestnum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="passnum"
            label="passtestnum"
            sortable
          >
            <template slot-scope="scope">
              <el-button type="text" @click="gettestdetails('PASS',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.passnum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="failnum"
            label="failtestnum"
            sortable
          >
            <template slot-scope="scope">
              <el-button type="text" @click="gettestdetails('FAIL',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.failnum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="unknownnum"
            label="unknownnum"
            sortable
          >
            <template slot-scope="scope">
              <el-button type="text" @click="gettestdetails('UNKNOWN',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.unknownnum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="runningnum"
            label="notfinished"
            sortable
          >
            <template slot-scope="scope">
              <el-button type="text" @click="gettestdetails('RUNNING',scope.row.projectname,scope.row.variantname,groupinfo.groupname,scope.row.changelist,scope.row.isBAPU,scope.row.shelve,scope.row.kickoffdate)">{{scope.row.runningnum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="passrate"
            label="passrate"
          >
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
            <el-table-column 
              property="testname" 
              label="testname" 
              width="200"
              sortable
            ></el-table-column>
            <el-table-column property="seed" label="seed" width="200"></el-table-column>
            <el-table-column property="signature" label="signature"></el-table-column>
          </el-table>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Oneprojoneregress',
  props: {
    groupstatus : []
  },
  data() {
    return {
      DVgroups  : [
        'HOST',
        'DMA',
        'MISC',
        'OTHERS',
        'PERF',
        'ALL'
      ],//TODO need to fetch from DB
      grpstatus : [],
      DVsum     : [],
      buttonclicked : '',
      selectedgroup : 'ALL',
      visible : false,
      title : '',
      testdetails_disp  : [],
      testdetails : [],
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
    }
  },
  watch : {
    visible_testdetails : function(oldv,newv){
      if(newv == false){
        this.searchparam.testnamesrch = '';
        this.searchparam.sigsrch      = '';
      }
    }
  },
  methods : {
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
    gettestdetails  (kind,projectname,variantname,groupname,changelist,isBAPU,shelve,kickoffdate){
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
          else if(kind  ==  'RUNNING'){
            this.title  = 'RUNNING tests list'
          }
        },
        function(){}
      );
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.cal(this.selectedgroup);
    },
    cal (name){
      this.buttonclicked  = name;
      this.grpstatus= [];
      let DVsumall  = 0;
      let DVsumpass = 0;
      let DVsumfail = 0;
      let DVsumunknown = 0;
      let DVsumrunning = 0;
      let DVsumpassrate = 0.00;
      for(let i=0;i<this.groupstatus.length;i++){
        if(name == 'ALL'){
          this.grpstatus.push(this.groupstatus[i]);
          DVsumall      +=  this.groupstatus[i].allnum;
          DVsumpass     +=  this.groupstatus[i].passnum;
          DVsumfail     +=  this.groupstatus[i].failnum;
          DVsumunknown  +=  this.groupstatus[i].unknownnum;
          DVsumrunning  +=  this.groupstatus[i].runningnum;
        }
        else 
        {
          if(this.groupstatus[i].DVgroup  ==name){
            this.grpstatus.push(this.groupstatus[i]);
            DVsumall  +=  this.groupstatus[i].allnum;
            DVsumpass +=  this.groupstatus[i].passnum;
            DVsumfail +=  this.groupstatus[i].failnum;
            DVsumunknown  +=  this.groupstatus[i].unknownnum;
            DVsumrunning  +=  this.groupstatus[i].runningnum;
          }
          else{
          }
        }
      }
      if(DVsumall ==  0){
      }
      else{
        DVsumpassrate = DVsumpass/DVsumall*100;
        DVsumpassrate = DVsumpassrate.toFixed(2);
      }
      this.DVsum  = [];
      this.DVsum.push({
        allnum  : DVsumall,
        passnum : DVsumpass,
        failnum : DVsumfail,
        unknownnum  : DVsumunknown,
        runningnum  : DVsumrunning,
        passrate  : DVsumpassrate
      });
    }
  },
  mounted (){
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
