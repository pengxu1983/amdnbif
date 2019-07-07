<template>
  <el-container>
    <el-header>
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">NBIF Main Page</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
          </li>
        </ul>
      </nav>
    </el-header>
    <el-main>
      <el-row>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button 
              type="primary"
              @click="projectadd()"
            >add</el-button>
          </el-form-item>
          <el-form-item>
            <el-button 
              type="primary"
              @click="upload()"
            >upload</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table
          :data="projects"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="projectname"
            label="projectname"
          >
          </el-table-column>
          <el-table-column
            prop="validvariants"
            label="validvariants"
          >
          </el-table-column>
          <el-table-column
            prop="milestones"
            label="milestones">
          </el-table-column>
          <el-table-column
            prop="ownerships"
            label="ownerships">
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'MetricsPage',
  props: {
  },
  data() {
    return {
      projects : [],
      variants : [],
      users    : [],
    }
  },
  methods : {
    projectsadd (){
      let oneproject  = {
        projectname : '',
        validvariants : [],
        milestones  : [
          {
            milestonename : 'LSA',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSB',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSC',
            droptime      : '',
            integratetime : ''
          },{
            milestonename : 'LSD',
            droptime      : '',
            integratetime : ''
          }
        ],
        ownerships  : {}
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
