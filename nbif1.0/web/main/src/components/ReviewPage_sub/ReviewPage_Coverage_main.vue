<template>
  <el-container>
    <el-col>
      <el-row>
        <span class="demonstration">Choose Date</span>
        <el-date-picker
          v-model="chosendate"
          align="right"
          type="date"
          placeholder="Choose Date"
          :picker-options="pickerOptions1">
        </el-date-picker>
        <a target="abc" 
        :href="'http://srdcws225:9001/reviews/COV_RPT/NV21/FUNC_COV/nbif_nv10_gpu_'+dateurl+'/func_cov_report/dashboard.html'"
        ><el-button @click="log">Confirm</el-button></a>
      </el-row>
      <iframe name="abc" width=100% height=1000px></iframe>
    </el-col>
  </el-container>
</template>

<script>
var moment = require('moment');
export default {
  name: 'ReviewPage_Coverage_main',
  props: {
    projectname : ''
  },
  data () {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'A week ago',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      chosendate : '',
    }
  },
  computed  : {
    dateurl : function(){
      console.log(moment(this.chosendate).format('YYYY-MM-DD'));
      return moment(this.chosendate).format('YYYY-MM-DD');
    }
  },
  methods : {
    log : function(){
      console.log(this.chosendate);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
