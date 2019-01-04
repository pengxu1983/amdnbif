<template>
  <el-container>
    <el-col :span=24>
      <el-row>
        <el-button type="primary" round @click='add()'>Add</el-button>
        <el-button type="primary" round @click='upload()'>Upload</el-button>
      </el-row>
      <el-table
        :data="machines"
        height="800"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="pcname"
          label="pcname"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="pcname"
              v-model="scope.row.pcname"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="roll"
          label="roll"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.roll" placeholder="machineRolls">
              <el-option 
                v-for="oneroll in rolls" 
                :label="oneroll" 
                :value="oneroll"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="site"
          label="site"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="site"
              v-model="scope.row.site"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="testStatus"
          label="testStatus"
          width="120"
        >
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="1000"
              trigger="click"
            >
              <el-table
                :data="scope.row.testStatus"
                border
                style="width: 100%">
                <el-table-column
                  prop="testname"
                  label="testname"
                >
                </el-table-column>
                <el-table-column
                  prop="stat"
                  label="status"
                >
                </el-table-column>
                <el-table-column
                  prop="projectname"
                  label="projectname"
                >
                </el-table-column>
                <el-table-column
                  prop="variantname"
                  label="variantname"
                >
                </el-table-column>
                <el-table-column
                  prop="changelist"
                  label="changelist"
                >
                </el-table-column>
                <el-table-column
                  prop="seed"
                  label="seed"
                >
                </el-table-column>
              </el-table>
              <el-button slot="reference">Details</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="operation"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index,machines)"
              type="text"
              size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-container>
</template>

<script>
export default {
  name: 'ConfigPage_machine_main',
  props: {
  },
  data () {
    return {
      machines: [],
      rolls : [
        'sanity',
        'dev'
      ]
    }
  },
  methods : {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    upload () {
      console.log('upload');
      this.$http.post('/config/upload',{
        kind  : 'machinesupload',
        machines : JSON.stringify(this.machines)
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            console.log('ok');
          }
          this.get();
          alert('uploaded');
        },
        function(){}
      );
    },
    add () {
      this.machines.unshift({
        pcname      : '',
        site        : '',
        roll        : 'dev',
        testStatus  : []
      });
    },
    get () {
      this.$http.post('/config/get',{
        kind  : 'allmachinesget'
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.machines= [];
            for(var index = 0; index< response.body.machines.length; index++){
              this.machines.push({
                pcname    : response.body.machines[index].pcname,
                roll      : response.body.machines[index].roll,
                site      : response.body.machines[index].site,
                testStatus: response.body.machines[index].testStatus
              });
            }
          }
        },
        function(){}
      );
    }
  },
  mounted  () {
    this.get();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
