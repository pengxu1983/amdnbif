<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">NBIF Main Page</a>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search(TODO)" aria-label="Search">
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
        'RegressionByGroup',
        'Regression',
        'Review',
        'Action',
        'Config',
        'TestplanDetail',
        'Sanity'
      ],
      versionRecord : [
        {
          versionID : '1.4.8',
          versionLog  : 'Adding one page for regression per group'
        },
        {
          versionID : '1.4.7',
          versionLog  : 'Sanity page init'
        },
        {
          versionID : '1.4.6',
          versionLog  : 'Testplan details page init'
        },
        {
          versionID : '1.4.5',
          versionLog  : 'config page initial'
        },
        {
          versionID : '1.4.4',
          versionLog  : '1. project name supports "FLOYD", "MI200", "NV21", "MERO"2. variant name supports "nbif_al_gpu", "nbif_al_gpu", "nbif_ssp_generic_a", "nbif_ssp_generic_b", "nbif_ssp_ntb", "nbif_oak_gpu" and "nbif_vg20_gpu"'
        },
        {
          versionID : '1.4.3',
          versionLog  : 'add home link'
        },
        {
          versionID : '1.4.2',
          versionLog  : 'add tables to describe regression parameters'
        },
        {
          versionID : '1.4.1',
          versionLog  : 'Regression charts are split into 4 groups: Normal, Long, PG, Baco. '
        },
        {
          versionID : '1.3',
          versionLog  : 'Regression Pic online'
        },
        {
          versionID : '1.2',
          versionLog  : 'Func Coverage Page alive'
        },
        {
          versionID : '1.1',
          versionLog  : 'add CL info into PA report page'
        },
        {
          versionID : '1.0',
          versionLog  : 'PA report published(not fully automatical, seeking a repo to restore rpt files)'
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
