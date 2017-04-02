<template lang="pug">
.l-default
  .l-default-header
    navigation
  .l-default-main
    router-view
</template>

<script>
import Navigation from '../partials/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.l-default {
  &-main {
    padding: 30px 40px;
  }
}
</style>
