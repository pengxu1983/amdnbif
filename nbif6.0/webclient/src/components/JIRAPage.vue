<template>
  <el-container>
    <div id="createdNumber" style="width: 100%;height:1000px;">
    </div>
    <br />
  </el-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'JIRAPage',
  props: {
  },
  methods: {
    getcreatedNumber(projectname){
      window.console.log(projectname);
    },
    createdNumber(){
      let myChart = this.$echarts.init(document.getElementById('createdNumber'));
      let X = [];
      for(let i=this.recordWindow;i>0;i--){
        X.push(moment().subtract(i,'days').format('YYYY-MM-DD'));
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
                text: 'JIRA Created Number Of All Projects Last 30 days(per day)'
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
      
    },
  },
  data() {
    return{
      recordWindow  : 30,
      projectlist   : ['Floyd','MI300','NV31']
    };
  },
  mounted (){
    //createdNumber
    this.createdNumber();
    
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
