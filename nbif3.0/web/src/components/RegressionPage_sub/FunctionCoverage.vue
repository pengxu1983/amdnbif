<template>
  <el-container>
    <el-header>
      <el-row>
        <el-button ><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.branch.mi200.nbif_nv10_gpu.group1.1/func_cov_report/dashboard.html">MI200 dgpu</a></el-button>
        <el-button ><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.branch.mi200.nbif_nv10_gpu.bapu.group1.1/func_cov_report/dashboard.html">MI200 bapu</a></el-button>
        <el-button ><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.main.rembrandt.nbif_draco_gpu.group1.1/func_cov_report/dashboard.html">RMB</a></el-button>
        <el-button ><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.main.floyd.nbif_et_0.group1.1/func_cov_report/dashboard.html">Floyd et0</a></el-button>
        <el-button ><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.main.floyd.nbif_et_1.group1.1/func_cov_report/dashboard.html">Floyd et1</a></el-button>
        <el-button ><a target="abc" href="http://logviewer-atl/proj/cip_floyd_genz/ip_regression/nbif.regression.main.floyd.nbif_et_2.group1.1/func_cov_report/dashboard.html">Floyd et2</a></el-button>
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
