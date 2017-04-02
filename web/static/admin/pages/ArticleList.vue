<template lang="pug">
ul.article-list
  li.article-item(v-for="a in articles") {{ a.title }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    articles: 'articles',
    page: 'articlePage'
  }),
  methods: mapActions(['fetchArticles']),

  created () {
    const { page, size } = this.$route.query
    this.fetchArticles({
      page,
      size
    })
  }
}
</script>

<style lang="scss">
</style>
