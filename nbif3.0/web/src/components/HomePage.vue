<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">NBIF Main Page</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#version">{{ this.versionRecord[0].versionID}}</button>
          </li>
        </ul>
      </nav>
    </el-header>
    <el-main>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in items" :key="item">
          <a
            @click="gotourl(item)"
          ><h3>{{ item }}</h3></a>
        </el-carousel-item>
      </el-carousel>
      <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="version">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <template>
              <el-table
                :data="versionRecord"
                border
                style="width: 100%">
                <el-table-column
                  prop="versionID"
                  label="versionID"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="versionLog"
                  label="versionLog"
                >
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
      <div>
        <el-header>
          <el-select v-model="currentvacation" placeholder="select" @change="getvacations()">
            <el-option
              v-for="item in availablevacations"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-header>
        <el-main>
          <el-table
            :data="vacations"
            border
            style="width: 100%">
            <el-table-column
              prop="realname"
              label="Name"
            >
            </el-table-column>
            <el-table-column
              prop="begin"
              label="Vacation Start"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.begin"
                  type="date"
                  placeholder="date">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column
              prop="end"
              label="Vacation End"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.end"
                  type="date"
                  placeholder="date">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column
              prop="cellphone"
              label="Cell Phone"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.cellphone" placeholder="cell phone"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="Opt"
            >
              <template slot-scope="scope">
                <el-button type="primary" @click="updatevacations(scope.row.username,scope.row.begin,scope.row.end,scope.row.cellphone)">Confirm</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
        </el-footer>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
  },
  data() {
    return {
      availablevacations  :[
        'National Day',
        'New Year',
        'Spring Festival',
        'Lantern Festival',
        'Tomb Sweeping Day',
        'Labor Day',
      ],
      currentvacation : 'Spring Festival',
      vacations : [],
      items : [
        'regression',
        'config',
        'sanity',
        'metrics',
        'jira'
      ],
      versionRecord : [
        {
          versionID : '4.0.0',
          versionLog  : 'Metrics page Added'
        },
        {
          versionID : '3.0.1',
          versionLog  : 'router to Regression page added'
        },
        {
          versionID : '3.0.0',
          versionLog  : 'Version 3.0.0 initial'
        },
      ]
    }
  },
  methods : {
    gotourl (url) {
      this.$router.push({
        name  : url
      });
    },
    updatevacations(username,begin,end,cellphone){
      this.$http.post('/config/users/vacation',{
        kind          : 'update',
        vacationname  : this.currentvacation,
        username      : username,
        begin         : begin,
        end           : end,
        cellphone     : cellphone
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            alert(username  + ' uploaded');
          }
          else{
            alert(response.body);
          }
        }
      );
    },
    getvacations  () {
      this.vacations  = [];
      this.$http.post('/config/users/vacation',{
        kind  : 'get',
        vacationname  : this.currentvacation  
      }).then(
        function(response){
          if(response.body.ok ==  'ok'){
            this.vacations  = JSON.parse(response.body.vacations);
          }
        }
      );
    }
  },
  mounted () {
    this.getvacations();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
