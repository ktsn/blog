<template lang="pug">
ul.article-list
  li.article-item(v-for="a in articles") {{ a.title }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['articles']),
  methods: mapActions(['fetchArticles']),

  created () {
    this.fetchArticles()
  }
}
</script>

<style lang="scss">
</style>
