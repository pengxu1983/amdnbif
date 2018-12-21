<template>
  <el-container>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/main">MainPage</a>
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">RegressionPage</a>
    </nav>
    <el-col :span="24">
      <el-container>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item label="ProjectName">
            <el-select v-model="projectinfo.projectname" placeholder="ProjectName">
              <el-option label="NV21" value="NV21"></el-option>
              <el-option label="MERO" value="MERO"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="TimeWindow">
            <el-select v-model="projectinfo.timewindow" placeholder="TimeWindow">
              <el-option label="week" value="week"></el-option>
              <el-option label="month" value="month"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Check</el-button>
          </el-form-item>
        </el-form>
      </el-container>
      <hr />
      <h3>Normal Regression</h3>
      <el-tabs v-model="activeNameNormal" @tab-click="handleClickNormal">
        <el-tab-pane label="Trend Chart" name="passingratenormal">
          <div id="chartRegressionNormal" style="width: 100%;height:400px;">
          </div>
        </el-tab-pane>
        <el-tab-pane label="Details Info" name="detailsinfonormal">
          <el-container style="width: 100%;height:400px;">
            <el-table
              :data="detailsinfonormal"
              height="400"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="Date"                    
              >                                 
              </el-table-column>                
              <el-table-column
                prop="changelist"                     
                label="ChangeList"                    
              >                    
              </el-table-column>
              <el-table-column
                prop="totalnum"
                label="TotalNum"
              >
              </el-table-column>
              <el-table-column
                prop="totalnumdelta"
                label="TotalNumDelta"
              >
              </el-table-column>
              <el-table-column
                prop="passednum"
                label="PassedNum"
              >
              </el-table-column>
              <el-table-column
                prop="failednum"
                label="FailedNum"
              >
              </el-table-column>
              <el-table-column
                prop="unknownnum"
                label="UnknownNum"
              >
              </el-table-column>
            </el-table>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <hr />
      <h3>Long Regression</h3>
      <el-tabs v-model="activeNameLong" @tab-click="handleClickLong">
        <el-tab-pane label="Trend Chart" name="passingratelong">
          <div id="chartRegressionLong" style="width: 100%;height:400px;">
          </div>
        </el-tab-pane>
        <el-tab-pane label="Details Info" name="detailsinfolong">
          <el-container style="width: 100%;height:400px;">
            <el-table
              :data="detailsinfolong"
              height="400"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="Date"                    
              >                                 
              </el-table-column>                
              <el-table-column
                prop="changelist"                     
                label="ChangeList"                    
              >                    
              </el-table-column>
              <el-table-column
                prop="totalnum"
                label="TotalNum"
              >
              </el-table-column>
              <el-table-column
                prop="totalnumdelta"
                label="TotalNumDelta"
              >
              </el-table-column>
              <el-table-column
                prop="passednum"
                label="PassedNum"
              >
              </el-table-column>
              <el-table-column
                prop="failednum"
                label="FailedNum"
              >
              </el-table-column>
              <el-table-column
                prop="unknownnum"
                label="UnknownNum"
              >
              </el-table-column>
            </el-table>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <hr />
      <h3>Baco Regression</h3>
      <el-tabs v-model="activeNameBaco" @tab-click="handleClickBaco">
        <el-tab-pane label="Trend Chart" name="passingratebaco">
          <div id="chartRegressionBaco" style="width: 100%;height:400px;">
          </div>
        </el-tab-pane>
        <el-tab-pane label="Details Info" name="detailsinfobaco">
          <el-container style="width: 100%;height:400px;">
            <el-table
              :data="detailsinfobaco"
              height="400"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="Date"                    
              >                                 
              </el-table-column>                
              <el-table-column
                prop="changelist"                     
                label="ChangeList"                    
              >                    
              </el-table-column>
              <el-table-column
                prop="totalnum"
                label="TotalNum"
              >
              </el-table-column>
              <el-table-column
                prop="totalnumdelta"
                label="TotalNumDelta"
              >
              </el-table-column>
              <el-table-column
                prop="passednum"
                label="PassedNum"
              >
              </el-table-column>
              <el-table-column
                prop="failednum"
                label="FailedNum"
              >
              </el-table-column>
              <el-table-column
                prop="unknownnum"
                label="UnknownNum"
              >
              </el-table-column>
            </el-table>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <hr />
      <h3>PG Regression</h3>
      <el-tabs v-model="activeNamePG" @tab-click="handleClickPG">
        <el-tab-pane label="Trend Chart" name="passingratepg">
          <div id="chartRegressionPG" style="width: 100%;height:400px;">
          </div>
        </el-tab-pane>
        <el-tab-pane label="Details Info" name="detailsinfopg">
          <el-container style="width: 100%;height:400px;">
            <el-table
              :data="detailsinfopg"
              height="400"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="Date"                    
              >                                 
              </el-table-column>                
              <el-table-column
                prop="changelist"                     
                label="ChangeList"                    
              >                    
              </el-table-column>
              <el-table-column
                prop="totalnum"
                label="TotalNum"
              >
              </el-table-column>
              <el-table-column
                prop="totalnumdelta"
                label="TotalNumDelta"
              >
              </el-table-column>
              <el-table-column
                prop="passednum"
                label="PassedNum"
              >
              </el-table-column>
              <el-table-column
                prop="failednum"
                label="FailedNum"
              >
              </el-table-column>
              <el-table-column
                prop="unknownnum"
                label="UnknownNum"
              >
              </el-table-column>
            </el-table>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <hr />
    </el-col>
  </el-container>
</template>

<script>
var moment  = require('moment');
export default {
  name: 'RegressionPage',
  props: {
  },
  data() {
    return {
      projectinfo : {
        projectname : 'NV21',
        timewindow  : 'week'
      },
      xAxislist             : [],
      PassingRate_his_normal: [],
      PassingRate_his_baco  : [],
      PassingRate_his_pg    : [],
      PassingRate_his_long  : [],
      FuncCov_his           : [],
      CodeCov_his           : [],
      activeNameNormal      : 'passingratenormal',
      activeNameLong        : 'passingratelong',
      activeNamePG          : 'passingratepg',
      activeNameBaco        : 'passingratebaco',
      detailsinfonormal     : [],
      detailsinfolong       : [],
      detailsinfobaco       : [],
      detailsinfopg         : [],
    }
  },
  methods : {
    handleClickNormal(tab, event) {
      console.log(tab, event);
    },
    handleClickBaco(tab, event) {
      console.log(tab, event);
    },
    handleClickLong(tab, event) {
      console.log(tab, event);
    },
    handleClickPG(tab, event) {
      console.log(tab, event);
    },
    onSubmit  : function(){
      console.log(this.projectinfo.timewindow);
      var i = 1;
      var item = "";
      if(this.projectinfo.timewindow == 'week'){
        this.xAxislist = [];
        while(item != moment().format('YYYY-MM-DD')){
          item  = moment().subtract(1,'weeks').add(i,'days').format('YYYY-MM-DD');
          this.xAxislist.push(item);
          i++;
        }
        console.log(this.xAxislist);
        this.getPassingRate(moment().subtract(1,'weeks').add(1,'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'));
      }
      else if(this.projectinfo.timewindow == 'month'){
        this.xAxislist = [];
        while(item != moment().format('YYYY-MM-DD')){
          item  = moment().subtract(1,'months').add(i,'days').format('YYYY-MM-DD');
          this.xAxislist.push(item);
          i++;
        }
        console.log(this.xAxislist);
        this.getPassingRate(moment().subtract(1,'months').add(1,'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'));
      }
      else if(this.projectinfo.timewindow == 'threemonths'){
        this.xAxislist = [];
        while(item != moment().format('YYYY-MM-DD')){
          item  = moment().subtract(3,'months').add(i,'days').format('YYYY-MM-DD');
          this.xAxislist.push(item);
          i++;
        }
        console.log(this.xAxislist);
        this.getPassingRate(moment().subtract(3,'months').add(1,'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'));
      }
      else if(this.projectinfo.timewindow == 'halfyear'){
        this.xAxislist = [];
        while(item != moment().format('YYYY-MM-DD')){
          item  = moment().subtract(6,'months').add(i,'days').format('YYYY-MM-DD');
          this.xAxislist.push(item);
          i++;
        }
        console.log(this.xAxislist);
        this.getPassingRate(moment().subtract(6,'months').add(1,'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'));
      }
      this.drawLine('chartRegressionNormal');
      this.drawLine('chartRegressionLong');
      this.drawLine('chartRegressionPG');
      this.drawLine('chartRegressionBaco');
    },
    getPassingRate  :function(datestart,dateend) {
      console.log('getPassingRate');
      console.log('datestart');
      console.log(datestart);
      console.log('dateend');
      console.log(dateend);
      this.$http.post('/regression/check',{
        kind  : 'rangepassingrate',
        datestart  : datestart,
        dateend    : dateend
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log('passingratenormal');
            console.log(response.body.PassingRate_his_normal);
            console.log('passingratelong');
            console.log(response.body.PassingRate_his_long);
            console.log('passingratepg');
            console.log(response.body.PassingRate_his_pg);
            console.log('passingratebaco');
            console.log(response.body.PassingRate_his_baco);
            this.PassingRate_his_normal   = response.body.PassingRate_his_normal;
            this.PassingRate_his_long     = response.body.PassingRate_his_long;
            this.PassingRate_his_pg       = response.body.PassingRate_his_pg;
            this.PassingRate_his_baco     = response.body.PassingRate_his_baco;
            this.detailsinfonormal        = response.body.detailsinfonormal;
            this.detailsinfolong          = response.body.detailsinfolong;
            this.detailsinfopg            = response.body.detailsinfopg;
            this.detailsinfobaco          = response.body.detailsinfobaco;
            this.drawLine('chartRegressionNormal');
            this.drawLine('chartRegressionLong');
            this.drawLine('chartRegressionPG');
            this.drawLine('chartRegressionBaco');
          }
          else if(response.body.ok  ==  'notok'){
          }
        },
        function(){}
      );
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
  },
  mounted(){
    this.drawLine('chartRegressionNormal');
    this.drawLine('chartRegressionLong');
    this.drawLine('chartRegressionPG');
    this.drawLine('chartRegressionBaco');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
