<template>
  <div>
    <el-table
      :data="groupstatus"
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
  </div>
</template>

<script>
export default {
  name: 'Oneprojoneregress',
  props: {
    groupstatus : []
  },
  data() {
  },
  methods : {
  },
  mounted (){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
