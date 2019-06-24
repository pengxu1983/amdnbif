<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">NBIF Main Page</a>
      </nav>
    </el-header>
    <el-main>
      <el-row>
        <el-button 
          type="primary"
          @click="add()"
        >add</el-button>
        <el-button 
          type="primary"
          @click="upload()"
        >upload</el-button>
      </el-row>
      <el-row>
        <el-table
          :data="sanity"
          style="width: 100%"
          max-height="250">
          <el-table-column
            fixed
            prop="taskname"
            label="taskname"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operation"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'SanityPage',
  props: {
  },
  data() {
    return {
    }
  },
  methods : {
    add(){},
    upload(){},
    get(){},
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
