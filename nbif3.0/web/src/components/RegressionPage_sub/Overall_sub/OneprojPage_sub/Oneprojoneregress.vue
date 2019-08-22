<template>
  <div>
    <el-tabs v-model="activeDVgroup" @tab-click="handleClick">
      <el-tab-pane 
        v-for="oneDVgroup in DVgroups"
        :label="oneDVgroup"
      >
        <el-table
          :data="getgroupstatus_disp"
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
            prop="alltestnum"
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
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
export default {
  name: 'Oneprojoneregress',
  props: {
    projectname : '',
    variantname : '',
    changelist  : '',
    isBAPU      : '',
    shelve      : '',
    kickoffdate : '',
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
    }
  },
  computed  : {
    getgroupstatus_disp : function(){
      let R = [];
      for(let i=0;i<this.groupstatus.length;i++){
        if(this.groupstatus[i].DVgroup  ==  this.activeDVgroup){
          R.push(this.groupstatus[i]);
        }
        else{
        }
      }
      return R;
    }
  },
  methods : {
    handleClick(tab, event) {
      console.log(tab, event);
      //console.log(this.projectname);
    },
  },
  mounted (){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
