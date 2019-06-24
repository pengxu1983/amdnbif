<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">NBIF Main Page</a>
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
      vacations : [],
      items : [
        'regression',
        'config',
        'sanity'
      ],
      versionRecord : [
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
    }
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
