<template>
  <div id="myChart" :style="{width: '100%', height: '600px'}">
  </div>
</template>

<script>
var moment = require('moment');
export default {
  name: 'oneprojjira',
  props: {
    projectname : String
  },
  data () {
    return {
      datay_created   : [],
      datay_closed    : [],
      period          : 'day',
      stack           : 'no',
      //endtime       : moment().format('YYYY/MM/DD'),
      slots           :  30,
    };
  },
  mounted(){
    this.getdata();
  },
  computed  : {
    datax_raw : function(){
      let result  = [];
      for(let i=0;i<this.slots;i++){
        let tmp = moment().subtract(i,this.period+'s');
        result.unshift(tmp);
      }
      return result;
    },
    datax   : function(){
      let result  = [];
      for(let i=0;i<this.datax_raw.length;i++){
        let tmp = moment(this.datax_raw[i]).format('YYYY/MM/DD');
        result.push(tmp);
      }
      return result;
    },
  },
  methods : {
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      let option = {
          title: {
              text: 'Created VS Closed'
          },
          tooltip : {
              trigger: 'axis',
          },
          legend: {
              data:['created','closed']
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : this.datax
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'created',
                  type:'line',
                  data:this.datay_created
              },
              {
                  name:'closed',
                  type:'line',
                  data:this.datay_closed
              },
          ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    getdata(){
      //get data from DB
      window.console.log(this.datax);
      this.$http.post('/jira/getdata',{
        datax   :JSON.stringify(this.datax_raw),
        period  :this.period,
        projectname : this.projectname
      }).then(
        function(response){
          window.console.log(response);
          if(response.body.ok ==  'ok'){
            this.datay_closed   = JSON.parse(response.body.datay_closed);
            this.datay_created  = JSON.parse(response.body.datay_created);
            this.drawLine();
          }
        },
        function(response){
          window.console.log(response);
        }
      );
    }
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
