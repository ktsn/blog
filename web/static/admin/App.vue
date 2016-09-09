<template lang="pug">
.app
  router-view
  nav.nav
    ul.nav-list
      li.nav-item
        router-link.nav-link(to="/") Home
      li.nav-item
        router-link.nav-link(to="/counter") Counter
</template>

<style lang="scss" scoped>
</style>
