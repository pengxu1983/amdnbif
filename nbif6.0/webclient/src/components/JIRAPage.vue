<template>
  <el-container>
    <el-row>
      <el-col :span="24"><div id="creatednumber" style="width: 1080px;height:900px;"></div></el-col>
      <el-col :span="24"><div id="totalnumber" style="width: 1080px;height:900px;"></div></el-col>
      <el-col :span="24"><div id="totalopennumber" style="width: 1080px;height:900px;"></div></el-col>
      <el-col :span="24"><div id="averageopentime" style="width: 1080px;height:900px;"></div></el-col>
      <el-col :span="24">
        <el-tabs v-model="currentProject" @tab-click="handleClick">
          <el-tab-pane label="Floyd" name="Floyd">
          </el-tab-pane>
          <el-tab-pane label="NV31" name="NV31">
          </el-tab-pane>
          <el-tab-pane label="MI300" name="MI300">
          </el-tab-pane>
        </el-tabs>
        <div id="perpersonjira" style="width: 2000px;height:900px;"></div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'JIRAPage',
  props: {
  },
  methods: {
    getcreatednumber(projectname){
      window.console.log(projectname);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.currentProject);
      this.perpersonjira(this.currentProject);
    },
    perpersonjira(projectname){
      let myChart = this.$echarts.init(document.getElementById('perpersonjira'));
      let X = [];
      for(let i=this.recordWindow;i>=0;i--){
        X.push(moment().day(1-i*7).format('YYYY-MM-DD'));
      }
      window.console.log(X);
      this.$http.post('/jira/perpersonjira', {
        //start       : moment().day(1-this.recordWindow*7).format('YYYY-MM-DD'),
        //end         : moment().day(1).format('YYYY-MM-DD'),
        //projectlist : JSON.stringify(this.projectlist),
        projectname : projectname
      }).then( 
        function(response){
          window.console.log('ok');
          let result  = JSON.parse(response.body.result);
          window.console.log(result);
          let userlist  = result['userlist'];
          //window.console.log(JSON.parse(response.body.result)[this.currentProject]);
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            legend: {
              data: ['Opened','Implemented', 'Closed', 'Rejected', 'Deferred']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: userlist
            },
            series: [
              {
                  name: 'Opened',
                  type: 'bar',
                  stack: 'total',
                  //label: {
                  //  show: true,
                  //  position: 'insideRight'
                  //},
                  data: result[this.currentProject]['Opened']
              },
              {
                  name: 'Implemented',
                  type: 'bar',
                  stack: 'total',
                  //label: {
                  //    show: true,
                  //    position: 'insideRight'
                  //},
                  data: result[this.currentProject]['Implemented']
              },
              {
                  name: 'Closed',
                  type: 'bar',
                  stack: 'total',
                  //label: {
                  //    show: true,
                  //    position: 'insideRight'
                  //},
                  data: result[this.currentProject]['Closed']
              },
              {
                  name: 'Rejected',
                  type: 'bar',
                  stack: 'total',
                  //label: {
                  //    show: true,
                  //    position: 'insideRight'
                  //},
                  data: result[this.currentProject]['Rejected']
              },
              {
                  name: 'Deferred',
                  type: 'bar',
                  stack: 'total',
                  //label: {
                  //    show: true,
                  //    position: 'insideRight'
                  //},
                  data: result[this.currentProject]['Deferred']
              },
            ]
          });
        },
        function(){
        }
      );
    },
    averageopentime(){
      let myChart = this.$echarts.init(document.getElementById('averageopentime'));
      let X = [];
      for(let i=this.recordWindow;i>=0;i--){
        X.push(moment().day(1-i*7).format('YYYY-MM-DD'));
      }
      window.console.log(X);
      this.$http.post('/jira/averageopentime', {
        start       : moment().day(1-this.recordWindow*7).format('YYYY-MM-DD'),
        end         : moment().day(1).format('YYYY-MM-DD'),
        projectlist : JSON.stringify(this.projectlist)
      }).then( 
        function(response){
          //window.console.log('ok');
          //window.console.log(JSON.parse(response.body.result)['Floyd']);
          //window.console.log(JSON.parse(response.body.result)['MI300']);
          //window.console.log(JSON.parse(response.body.result)['NV31']);
          myChart.setOption({
            title: {
              text: 'Total Open number'
            },
            tooltip: {
              trigger: 'axis'
            },
            dataset: {
              dimensions: ['project', 'shortest', 'average', 'longest'],
              source: [
                JSON.parse(response.body.result)['Floyd'],
                JSON.parse(response.body.result)['MI300'],
                JSON.parse(response.body.result)['NV31'],
                //{
                //  project: 'Matcha Latte', 
                //  'shortest': 43.3, 
                //  'average': 85.8, 
                //  'longest': 93.7
                //},
                //{
                //  project: 'Milk Tea', 
                //  'shortest': 83.1, 
                //  'average': 73.4, 
                //  'longest': 55.1
                //},
                //{
                //  project: 'Cheese Cocoa', 
                //  'shortest': 86.4, 
                //  'average': 65.2, 
                //  'longest': 82.5
                //},
                
              ]
            },
            //legend: {
            //  data: [
            //    'Floyd', 
            //    'MI300', 
            //    'NV31'
            //  ]
            //},
            //grid: {
            //  left: '3%',
            //  right: '4%',
            //  bottom: '3%',
            //  containLabel: true
            //},
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              //boundaryGap: false,
              //data: X
            },
            yAxis: {
              //type: 'value'
            },
            series: [
              {
                //name: 'Floyd',
                //type: 'line',
                //data: JSON.parse(response.body.result)['Floyd']
                type: 'bar'
              },
              {
                //name: 'MI300',
                //type: 'line',
                //data: JSON.parse(response.body.result)['MI300']
                type: 'bar'
              },
              {
                //name: 'NV31',
                //type: 'line',
                //data: JSON.parse(response.body.result)['NV31']
                type: 'bar'
              },
            ]
          });
        },
        function(){
          window.console.log('notok');
        }
      );
    },
    totalopennumber(){
      let myChart = this.$echarts.init(document.getElementById('totalopennumber'));
      let X = [];
      for(let i=this.recordWindow;i>=0;i--){
        X.push(moment().day(1-i*7).format('YYYY-MM-DD'));
      }
      window.console.log(X);
      this.$http.post('/jira/totalopennumber', {
        start       : moment().day(1-this.recordWindow*7).format('YYYY-MM-DD'),
        end         : moment().day(1).format('YYYY-MM-DD'),
        projectlist : JSON.stringify(this.projectlist)
      }).then( 
        function(response){
          //window.console.log('ok');
          //window.console.log(JSON.parse(response.body.result)['Floyd']);
          //window.console.log(JSON.parse(response.body.result)['MI300']);
          //window.console.log(JSON.parse(response.body.result)['NV31']);
          myChart.setOption({
            title: {
              text: 'Total Open number'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [
                'Floyd', 
                'MI300', 
                'NV31'
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
                    saveAsImage: {}
                }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: X
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                  name: 'Floyd',
                  type: 'line',
                  data: JSON.parse(response.body.result)['Floyd']
              },
              {
                  name: 'MI300',
                  type: 'line',
                  data: JSON.parse(response.body.result)['MI300']
              },
              {
                  name: 'NV31',
                  type: 'line',
                  data: JSON.parse(response.body.result)['NV31']
              },
            ]
          });
        },
        function(){
          window.console.log('notok');
        }
      );
    },
    creatednumber(){
      let myChart = this.$echarts.init(document.getElementById('creatednumber'));
      let X = [];
      for(let i=this.recordWindow;i>=0;i--){
        X.push(moment().day(1-i*7).format('YYYY-MM-DD'));
      }
      window.console.log(X);
      this.$http.post('/jira/creatednumber', {
        start       : moment().subtract(this.recordWindow,'days').format('YYYY-MM-DD'),
        end         : moment().subtract(1,'days').format('YYYY-MM-DD'),
        projectlist : JSON.stringify(this.projectlist)
      }).then( 
        function(response){
          //window.console.log('ok');
          //window.console.log(JSON.parse(response.body.result)['Floyd']);
          //window.console.log(JSON.parse(response.body.result)['MI300']);
          //window.console.log(JSON.parse(response.body.result)['NV31']);
          myChart.setOption({
            title: {
                text: 'Created Number'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [
                'Floyd', 
                'MI300', 
                'NV31'
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
                    saveAsImage: {}
                }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: X
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                  name: 'Floyd',
                  type: 'line',
                  data: JSON.parse(response.body.result)['Floyd']
              },
              {
                  name: 'MI300',
                  type: 'line',
                  data: JSON.parse(response.body.result)['MI300']
              },
              {
                  name: 'NV31',
                  type: 'line',
                  data: JSON.parse(response.body.result)['NV31']
              },
            ]
          });
        },
        function(){
          window.console.log('notok');
        }
      );
    },
    totalnumber(){
      let myChart = this.$echarts.init(document.getElementById('totalnumber'));
      let X = [];
      for(let i=this.recordWindow;i>=0;i--){
        X.push(moment().day(1-i*7).format('YYYY-MM-DD'));
      }
      window.console.log(X);
      this.$http.post('/jira/totalnumber', {
        start       : moment().day(1-this.recordWindow*7).format('YYYY-MM-DD'),
        end         : moment().day(1).format('YYYY-MM-DD'),
        projectlist : JSON.stringify(this.projectlist)
      }).then( 
        function(response){
          window.console.log('ok');
          window.console.log(JSON.parse(response.body.result)['Floyd']);
          window.console.log(JSON.parse(response.body.result)['MI300']);
          window.console.log(JSON.parse(response.body.result)['NV31']);
          myChart.setOption({
            title: {
              text: 'Total number'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [
                'Floyd', 
                'MI300', 
                'NV31'
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
                    saveAsImage: {}
                }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: X
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                  name: 'Floyd',
                  type: 'line',
                  data: JSON.parse(response.body.result)['Floyd']
              },
              {
                  name: 'MI300',
                  type: 'line',
                  data: JSON.parse(response.body.result)['MI300']
              },
              {
                  name: 'NV31',
                  type: 'line',
                  data: JSON.parse(response.body.result)['NV31']
              },
            ]
          });
        },
        function(){
          window.console.log('notok');
        }
      );
    },
  },
  data() {
    return{
      recordWindow  : 10,
      projectlist   : ['Floyd','MI300','NV31'],
      currentProject : 'Floyd'
    };
  },
  mounted (){
    //creatednumber
    this.creatednumber();
    this.totalnumber();
    this.totalopennumber();
    this.averageopentime();
    this.perpersonjira(this.currentProject);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
