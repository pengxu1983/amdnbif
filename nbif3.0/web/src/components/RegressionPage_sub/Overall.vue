<template>
  <el-tabs v-model="activeProj" type="card" @tab-click="handleClick">
    <el-tab-pane label="mi200" name="mi200">
      <el-table
        :data="regressionstatus('mi200')"
        border
        style="width: 100%">
        <el-table-column
          prop="kickoffdate"
          label="kickoffdate"
          width="180">
        </el-table-column>
        <el-table-column
          prop="changelist"
          label="changelist"
          width="180">
        </el-table-column>
        <el-table-column
          prop="passrate"
          label="passrate">
        </el-table-column>
        <el-table-column
          prop="passnum"
          label="passnum">
        </el-table-column>
        <el-table-column
          prop="failnum"
          label="failnum">
        </el-table-column>
        <el-table-column
          prop="unknownnum"
          label="unknownnum">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Overall',
  props: {
  },
  data() {
    return {
      projects  : [],
      projectinfo : {
        projectname : 'mi200'
      },
      activeProj: 'mi200',
    }
  },
  methods : {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    regressionstatus(projectname){
    },
    drawLine(chartid){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(chartid))
      // 绘制图表
      var option;
      option = {
        title: {
          //text: 'Regression Overall Status'
          text  : ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:[
            'PassingRate',
            //'FuncCov',
            //'CodeCov'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {show : true}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxislist
        },
        yAxis: {
            type: 'value'
        },
        series: []
      };
      if(chartid == 'chartRegressionNormal'){
        //option.title.text = 'PassingRate';
        option.series = [
          {
            name:'PassingRate',
            type:'line',
            data:this.PassingRate_his_normal
          },
        ];
      }
      else if(chartid == 'chartRegressionLong'){
        //option.title.text = 'PassingRate';
        option.series = [
          {
            name:'PassingRate',
            type:'line',
            data:this.PassingRate_his_long
          },
        ];
      }
      else if(chartid == 'chartRegressionBaco'){
        //option.title.text = 'PassingRate';
        option.series = [
          {
            name:'PassingRate',
            type:'line',
            data:this.PassingRate_his_baco
          },
        ];
      }
      else if(chartid == 'chartRegressionPG'){
        //option.title.text = 'PassingRate';
        option.series = [
          {
            name:'PassingRate',
            type:'line',
            data:this.PassingRate_his_pg
          },
        ];
      }
      myChart.setOption(option);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
