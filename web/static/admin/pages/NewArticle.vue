<template lang="pug">
article
  h1 Create New Article
  article-form(@submit="submitArticle")
</template>

<script>
import { mapActions } from 'vuex'
import ArticleForm from '../components/ArticleForm'

export default {
  components: {
    ArticleForm
  },

  methods: mapActions(['submitArticle'])
}
</script>

<style lang="scss" scoped>
</style>
