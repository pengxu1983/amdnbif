<template>
  <el-container>
    <el-header>
      <el-row>
        <el-button type="primary"><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.main.mi200.nbif_nv10_gpu.group1.1/func_cov_report/dashboard.html">MI200 dgpu</a></el-button>
        <el-button type="primary"><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.main.mi200.nbif_nv10_gpu.bapu.group1.1/func_cov_report/dashboard.html">MI200 bapu</a></el-button>
      </el-row>
    </el-header>
    <el-main>
      <iframe name="abc" width=100% height=1000px></iframe>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'FunctionCoverage',
  props: {
  },
  data() {
    return {}
  },
  methods : {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
