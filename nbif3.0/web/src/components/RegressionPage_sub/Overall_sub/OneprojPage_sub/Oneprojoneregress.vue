<template>
  <div>
    <el-tabs v-model="activeDVgroup" @tab-click="handleClick">
      <el-tab-pane 
        v-for="oneDVgroup in DVgroups"
        :label="oneDVgroup"
      >
        <el-table
          :data="getgroupstatus_disp(activeDVgroup)"
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
      groupstatus_disp  : []
    }
  },
  methods : {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.projectname);
    },
    getgroupstatus_disp(DVgroup){
    }
  },
  mounted (){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
