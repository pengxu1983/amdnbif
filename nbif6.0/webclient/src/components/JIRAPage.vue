<template>
  <el-container>
    <el-row>
      <el-col :span="24"><div id="creatednumber" style="width: 1080px;height:900px;"></div></el-col>
      <el-col :span="24"><div id="totalnumber" style="width: 1080px;height:900px;"></div></el-col>
      <el-col :span="24"><div id="totalopennumber" style="width: 1080px;height:900px;"></div></el-col>
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
          window.console.log('ok');
          window.console.log(JSON.parse(response.body.result)['Floyd']);
          window.console.log(JSON.parse(response.body.result)['MI300']);
          window.console.log(JSON.parse(response.body.result)['NV31']);
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
          window.console.log('ok');
          window.console.log(JSON.parse(response.body.result)['Floyd']);
          window.console.log(JSON.parse(response.body.result)['MI300']);
          window.console.log(JSON.parse(response.body.result)['NV31']);
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
      projectlist   : ['Floyd','MI300','NV31']
    };
  },
  mounted (){
    //creatednumber
    this.creatednumber();
    this.totalnumber();
    this.totalopennumber();
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
