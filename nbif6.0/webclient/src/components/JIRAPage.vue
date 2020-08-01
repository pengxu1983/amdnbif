<template>
  <el-container>
    <div id="createdNumber" style="width: 100%;height:1000px;">
    </div>
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
          window.console.log(JSON.parse(response.body.result))
          myChart.setOption({
            title: {
                text: 'JIRA Created Number Of All Projects'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Floyd', 'MI300', 'NV31']
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
                  data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name: 'MI300',
                  type: 'line',
                  data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name: 'NV31',
                  type: 'line',
                  data: [150, 232, 201, 154, 190, 330, 410]
              },
            ]
          });
        },
        function(){
          window.console.log('notok');
        }
      );
      
    }
  },
  data() {
    return{
      recordWindow  : 30,
      projectlist   : ['Floyd']
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
