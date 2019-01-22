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
      <el-table
        :data="vacations"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="Name"
        >
        </el-table-column>
        <el-table-column
          prop="vacationplan"
          label="Vacation Plan Official day"
        >
        </el-table-column>
        <el-table-column
          prop="mailaccess"
          label="Mail Access"
        >
        </el-table-column>
        <el-table-column
          prop="VPNaccess"
          label="VPN Access"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="Telephone Number"
        >
        </el-table-column>
      </el-table>
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
      vacations : [
        {name:"Antti",
        vacationplan:"1/31 ~ 2/10",
        mailaccess:"yes",
        VPNaccess:"Not stable",
        phone:"18516051670"},
        {name:"James Wang",
        vacationplan:"2/04 ~ 2/12",
        mailaccess:"yes",
        VPNaccess:"yes",
        phone:"15618765231"},
        {name:"Echo Wang",
        vacationplan:"2/01 ~2/11",
        mailaccess:"Yes",
        VPNaccess:"No",
        phone:"13671531459"},
        {name:"Zou Yang",
        vacationplan:"2/03 ~ 2/10",
        mailaccess:"yes",
        VPNaccess:"yes",
        phone:"17821833167"},
        {name:"Alex",
        vacationplan:"2/4 ~ 2/17",
        mailaccess:"limited before 2/9",
        VPNaccess:"limited before 2/9",
        phone:"13818843661"},
        {name:"Sidney Luo",
        vacationplan:"2/4~ 2/12",
        mailaccess:"Yes",
        VPNaccess:"Limited",
        phone:"13817734787"},
        {name:"Wang.xiaojun",
        vacationplan:"2/3~2/10",
        mailaccess:"Yes",
        VPNaccess:"Not stable",
        phone:"17636643561"},
        {name:"Allen Zhu",
        vacationplan:"2/4~2/10",
        mailaccess:"Yes",
        VPNaccess:"No",
        phone:"13681959306"},
        {name:"Peter Wang",
        vacationplan:"2/3~2/13",
        mailaccess:"Yes",
        VPNaccess:"Yes",
        phone:"13971233495"},
        {name:"Shawn Han",
        vacationplan:"1/25~2/10",
        mailaccess:"Yes",
        VPNaccess:"No",
        phone:"13881957556"},
        {name:"Xie Ting",
        vacationplan:"2/4~2/10",
        mailaccess:"Yes",
        VPNaccess:"Yes",
        phone:"18616536072"},
        {name:"liubin",
        vacationplan:"2/2~2/12",
        mailaccess:"Yes",
        VPNaccess:"No",
        phone:"18616256535"},
        {name:"Shuming Chen",
        vacationplan:"2/4~2/15",
        mailaccess:"yes",
        VPNaccess:"yes",
        phone:"15502109109"},
        {name:"Vince Xu",
        vacationplan:"2/4~2/15",
        mailaccess:"Yes",
        VPNaccess:"Yes before 2/9, not sure after.",
        phone:"13466365396"},
        {name:"Li Qing",
        vacationplan:"2/4~2/10",
        mailaccess:"Yes",
        VPNaccess:"Yes",
        phone:"13611610434"},
        {name:"shiwu",
        vacationplan:"2/3~2/13",
        mailaccess:"Yes",
        VPNaccess:"no",
        phone:"15935626331"},
        {name:"Sumin",
        vacationplan:"2/4~2/10",
        mailaccess:"Yes",
        VPNaccess:"Yes",
        phone:"13816035121"},
        {name:"Rae Wang",
        vacationplan:"2/4~2/15",
        mailaccess:"Yes",
        VPNaccess:"Yes",
        phone:"15091674086"},
        {name:"Bob Liu",
        vacationplan:"1/31 ~ 2/10",
        mailaccess:"yes",
        VPNaccess:"Not stable",
        phone:"17717780864"},
        {name:"Belle Chen",
        vacationplan:"1/31 ~ 2/13",
        mailaccess:"Yes",
        VPNaccess:"No",
        phone:"18616746082"},
        {name:"Zhanfeng Yang",
        vacationplan:"2/1 ~ 2/13",
        mailaccess:"yes",
        VPNaccess:"Not sure",
        phone:"13023193971"},
        {name:"Weng Lingyun",
        vacationplan:"2/2 ~ 2/20",
        mailaccess:"yes",
        VPNaccess:"Not sure",
        phone:"17765154003"},
        {name:"Tracy Gong",
        vacationplan:"2/3~2/13",
        mailaccess:"yes",
        VPNaccess:"no",
        phone:"15502136802"},
        {name:"Xu Wenyan",
        vacationplan:"2/3 ~ 2/11",
        mailaccess:"yes",
        VPNaccess:"Not sure",
        phone:"15210583219"},
        {name:"Yu Dong",
        vacationplan:"2/2 ~ 2/10",
        mailaccess:"Yes",
        VPNaccess:"No",
        phone:"15996277234"},
        {name:"Pengfei li",
        vacationplan:"2/2~ 2/14",
        mailaccess:"yes",
        VPNaccess:"Not sure",
        phone:"15618587737"},
        {name:"gaozhe",
        vacationplan:"1/30~2/12",
        mailaccess:"yes",
        VPNaccess:"no",
        phone:"18829291948"},
        {name:"pengxu",
        vacationplan:"2/4~2/10",
        mailaccess:"yes",
        VPNaccess:"yes",
        phone:"17610126969"},
        {name:"George Chen",
        vacationplan:"2/3~2/12",
        mailaccess:"yes",
        VPNaccess:"Not sure after 2/6",
        phone:"17749792958"},
        
      ],
      items : [
        'Regression',
        'Review',
        'Action',
        'Config',
        'TestplanDetail',
        'Sanity'
      ],
      versionRecord : [
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
