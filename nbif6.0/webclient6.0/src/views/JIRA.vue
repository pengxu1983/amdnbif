<template>
  <div class="home">
    <JIRAPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import JIRAPage from '@/components/JIRAPage.vue'

export default {
  name: 'jira',
  components: {
    JIRAPage
  }
}
</script>
