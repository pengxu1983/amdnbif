<template>
  <el-container>
    <el-form ref="regressionID" :model="regressionID" label-width="100px">
      <el-form-item label="codeline">
        <el-select v-model="regressionID.codeline">
          <el-option
            v-for="item in codelines"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="branch_name">
        <el-select v-model="regressionID.branch_name">
          <el-option
            v-for="item in branch_names"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="variant">
        <el-select v-model="regressionID.variantname">
          <el-option
            v-for="item in variants"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="changelist">
        <el-input v-model="regressionID.changelist"></el-input>
      </el-form-item>
      <el-form-item label="shelve">
        <el-input v-model="regressionID.shelve"></el-input>
      </el-form-item>
      <el-form-item label="group">
        <el-input v-model="regressionID.group"></el-input>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'RegressionSubmit',
  props: {
  },
  data() {
    return {
      regressionID  : {
        variantname : 'nbif_et_0',
        codeline    : 'nbif2_0',
        branch_name : 'nbif2_0_main',
        changelist  : '',
        shelve      : 'NA',
        username    : '',
        group       : ''
      },
      variants      : [
        'nbif_et_0',
        'nbif_et_1',
        'nbif_et_2',
        'nbif_nv10_gpu',
        'nbif_draco_gpu'
      ],
      codelines     : [
        'nbif2_0'
      ],
      branch_names  : [
        'nbif2_0_main'
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
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
