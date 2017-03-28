<template lang="pug">
.app
  .app-header
    navigation
  .app-main
    router-view
</template>

<script>
import Navigation from './partials/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.app {
  &-main {
    padding: 30px 40px;
  }
}
</style>
