<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item label="codeline">
            <el-select v-model="selectedcodeline">
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
            <el-select v-model="selectedbranch_name">
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
            <el-input v-model="selectedshelvenumber" placeholder="shelvenumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitChangelist">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-main>
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
      selectedcodeline  : 'nbif2_0',
      selectedbranch_name : 'nbif2_0_main',
      selectedshelvenumber  : '',
      email : ''
    }
  },
  methods : {
    submitChangelist(){
      window.console.log('submitting shelvenumber ');
      this.$http.post('/sanity/check',{
        codeline    : this.selectedcodeline,
        branch_name : this.selectedbranch_name,
        shelvenumber: this.selectedshelvenumber,
        email       : this.email
      }).then(
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
