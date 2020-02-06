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
    <el-container style="border: 1px solid #eee">
      <el-main>
          <el-form :inline="true" :model="configuration_id" class="demo-form-inline">
            <el-form-item label="codeline">
              <el-select v-model="configuration_id.codeline">
                <el-option 
                  v-for="item in codelines"
                  :key="item"
                  :label="item" 
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="branch_name">
              <el-select v-model="configuration_id.branch_name">
                <el-option 
                  v-for="item in branch_names"
                  :key="item"
                  :label="item" 
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="shelvenumber">
              <el-input v-model="configuration_id.shelvenumber" placeholder="shelvenumber"></el-input>
            </el-form-item>
            <el-form-item label="email">
              <el-input v-model="configuration_id.email" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitChangelist">Submit</el-button>
            </el-form-item>
          </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: 'SanityPage',
  props: {
    msg: String
  },
  data(){
    return {
      codelines : [
        'nbif2_0'
      ],
      branch_names : [
        'nbif_mi200_lsd',
        'nbif2_0_main'
      ],
      configuration_id : {
        codeline  : 'nbif2_0',
        branch_name : 'nbif2_0_main',
        shelvenumber  : '',
        email : '',
        changelist : 'top',
      }
    }
  },
  methods : {
    submitChangelist(){
      window.console.log('submitting shelvenumber ');
      if(this.email == ''){
        window.console.log('email is not allowed to be blank');
        return;
      }
      this.$http.post('/sanity/check',this.configuration_id).then(
        function(response){
          window.console.log(response);
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
