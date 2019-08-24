<template>
  <div>
    <el-button-group>
      <el-button 
        v-for="oneDVgroup in DVgroups"
        type="primary"
        @click="cal(oneDVgroup)"
      >
      {{ oneDVgroup }}
      </el-button>
    </el-button-group>
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
        prop="failnum"
        label="failtestnum"
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
      grpstatus : []
    }
  },
  methods : {
    cal (name){
      this.grpstatus= [];
      for(let i=0;i<this.groupstatus.length;i++){
        if(this.groupstatus[i].DVgroup  ==name){
          this.grpstatus.push(this.groupstatus[i]);
        }
        else{
        }
      }
    }
  },
  mounted (){
    this.cal('HOST');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
