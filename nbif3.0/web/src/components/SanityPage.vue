<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form :inline="true" :model="projectinfo" class="demo-form-inline">
          <el-form-item label="Project">
            <el-select v-model="projectinfo.projectname" placeholder="Project" @change="getprojects()">
              <el-option 
                v-for="oneproject in projects"
                :label="oneproject.projectname" 
                :value="oneproject.projectname"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Variant">
            <el-select v-model="projectinfo.variantname" placeholder="Variant" @change="getgroups()">
              <el-option 
                v-for="onevariant in validvariants"
                :label="onevariant" 
                :value="onevariant"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="isBAPU">
            <el-select v-model="projectinfo.isBAPU" placeholder="BAPU" @change="getgroups()">
              <el-option 
                v-for="item in options"
                :label="item" 
                :value="item"
              >
              </el-option>
            </el-select>
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
