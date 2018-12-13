<template>
  <el-tabs v-model="PA_active_tab" type="card" @tab-click="handleClick">
    <el-tab-pane label="25" name="25">
      <template>
        <el-table
          :data="PA_info.PA25"
          border
          style="width: 100%">
          <el-table-column
            prop="CaseName"
            label="CaseName"
          >
          </el-table-column>
          <el-table-column
            prop="ChangeList"
            label="ChangeList"
          >
          </el-table-column>
        </el-table>
      </template>
      <iframe src="http://srdcws225:9001/reviews/pa/NV21/CL3540486/25/10_17_2018/" width="100%" height="1000"></iframe>
    </el-tab-pane>
    <el-tab-pane label="100" name="100">
      <template>
        <el-table
          :data="PA_info.PA100"
          border
          style="width: 100%">
          <el-table-column
            prop="CaseName"
            label="CaseName"
          >
          </el-table-column>
          <el-table-column
            prop="ChangeList"
            label="ChangeList"
          >
          </el-table-column>
        </el-table>
      </template>
      <iframe src="http://srdcws225:9001/reviews/pa/NV21/CL3540486/100/10_17_2018/" width="100%" height="1000"></iframe>
    </el-tab-pane>
    <el-tab-pane label="idle_mgcg_en" name="idle_mgcg_en">
      <template>
        <el-table
          :data="PA_info.idle_mgcg_en"
          border
          style="width: 100%">
          <el-table-column
            prop="CaseName"
            label="CaseName"
          >
          </el-table-column>
          <el-table-column
            prop="ChangeList"
            label="ChangeList"
          >
          </el-table-column>
        </el-table>
      </template>
      <iframe src="http://srdcws225:9001/reviews/pa/NV21/CL3540486/idle_mgcg_all_enabled/10_17_2018/" width="100%" height="1000"></iframe>
    </el-tab-pane>
    <el-tab-pane label="idle_mgcg_dis" name="idle_mgcg_dis">
      <template>
        <el-table
          :data="PA_info.idle_mgcg_dis"
          border
          style="width: 100%">
          <el-table-column
            prop="CaseName"
            label="CaseName"
          >
          </el-table-column>
          <el-table-column
            prop="ChangeList"
            label="ChangeList"
          >
          </el-table-column>
        </el-table>
      </template>
      <iframe src="http://srdcws808:9001/reviews/pa/NV21/CL3540486/idle_mgcg_all_disabled/10_17_2018/" width="100%" height="1000"></iframe>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'ReviewPage_PA_main',
  props: {
  },
  data () {
    return {
      PA_active_tab: 'idle_mgcg_en',
      PA_info : {
        PA25  : [
          {
            CaseName  : 'perf_test_for_pa_25',
            ChangeList  : '3540486',
          },
        ],
        PA100 : [
          {
            CaseName  : 'perf_test_for_pa_100',
            ChangeList  : '3540486',
          },
        ],
        idle_mgcg_en  : [
          {
            CaseName  : 'perf_test_for_pa_idle_mgcg_all_enabled',
            ChangeList  : '3540486',
          },
        ],
        idle_mgcg_dis : [
          {
            CaseName  : 'perf_test_for_pa_idle_mgcg_all_disabled',
            ChangeList  : '3540486',
          },
        ]
      }
    }
  },
  methods : {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
