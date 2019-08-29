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
        <h2>DV Group Summary</h2>
        <hr />
        <el-table
          :data="DVsum"
          stripe
          border
          style="width: 100%">
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
            prop="passrate"
            label="passrate"
          >
          </el-table-column>
        </el-table>
        <h2>Feature Group Summary</h2>
        <hr />
        <el-table
          :data="grpstatus"
          stripe
          border
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
          </el-table-column>
          <el-table-column
            prop="passnum"
            label="passtestnum"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="failnum"
            label="failtestnum"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="passrate"
            label="passrate"
          >
          </el-table-column>
        </el-table>
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
      selectedgroup : 'ALL'
    }
  },
  methods : {
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
      let DVsumpassrate = 0.00;
      for(let i=0;i<this.groupstatus.length;i++){
        if(name == 'ALL'){
          this.grpstatus.push(this.groupstatus[i]);
          DVsumall  +=  this.groupstatus[i].allnum;
          DVsumpass +=  this.groupstatus[i].passnum;
          DVsumfail +=  this.groupstatus[i].failnum;
        }
        else 
        {
          if(this.groupstatus[i].DVgroup  ==name){
            this.grpstatus.push(this.groupstatus[i]);
            DVsumall  +=  this.groupstatus[i].allnum;
            DVsumpass +=  this.groupstatus[i].passnum;
            DVsumfail +=  this.groupstatus[i].failnum;
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
        passrate  : DVsumpassrate
      });
    }
  },
  mounted (){
    this.handleClick();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
