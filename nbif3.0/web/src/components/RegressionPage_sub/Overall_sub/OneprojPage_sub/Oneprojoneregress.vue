<template>
  <div>
    <el-tabs v-model="activeDVgroup" @tab-click="handleClick">
      <el-tab-pane 
        v-for="oneDVgroup in DVgroups"
        :label="oneDVgroup"
      >
      </el-tab-pane>
    </el-tabs>
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
      >
      </el-table-column>
      <el-table-column
        prop="passrate"
        label="passrate"
        sortable
      >
      </el-table-column>
    </el-table>
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
        'PERF'
      ],//TODO need to fetch from DB
      activeDVgroup : 'HOST',
      grpstatus : []
    }
  },
  methods : {
    handleClick(tab, event) {
      //console.log(tab, event);
      console.log('DBG');
      console.log(this.groupstatus);
      console.log(this.activeDVgroup);
      this.cal();
    },
    cal (){
      this.groupstatus  = [];
      let R = [];
      for(let i=0;i<this.groupstatus.length;i++){
        if(this.groupstatus[i].DVgroup  ==  this.activeDVgroup){
          R.push(this.groupstatus[i]);
        }
        else{
        }
      }
      this.grpstatus  = R;
    }
  },
  mounted (){
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
