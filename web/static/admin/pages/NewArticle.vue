<template lang="pug">
article
  h1 Create New Article
  article-form(@submit="submitArticle")
</template>

<script>
// @flow
import type Article from 'core/models/article'
import ArticleForm from '../components/ArticleForm'

export default {
  components: {
    ArticleForm
  },

  methods: {
    submitArticle (article: Article) {
      this.$store.dispatch('submitArticle', article)
        .then(() => {
          this.$router.push('/articles')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
