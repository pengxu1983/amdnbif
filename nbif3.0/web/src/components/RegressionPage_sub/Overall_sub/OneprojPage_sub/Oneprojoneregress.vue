<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane 
        v-for="oneDVgroup in DVgroups"
        :label="oneDVgroup"
      >
        <el-table
          :data="groupstatus_disp"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="DVgroup"
            label="DVgroup"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="groupname"
            label="groupname"
            sortable
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
      activeName  : 'HOST',
      groupstatus_disp  : []
    }
  },
  methods : {
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  },
  mounted (){
    console.log(this.projectname);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
