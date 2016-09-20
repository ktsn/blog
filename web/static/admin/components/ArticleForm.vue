<template lang="pug">
form.article-form(@submit.prevent="submitArticle")
  input(type="text" v-model="article.title")
  textarea(v-model="article.body")
  markdown-renderer(:body="article.body")
  button(type="submit") Send
</template>

<script>
import MarkdownRenderer from 'core/components/MarkdownRenderer'
import { empty } from 'core/models/article'

export default {
  props: {
    defaultValue: {
      type: Object,
      default: empty
    }
  },

  data() {
    return {
      article: this.defaultValue.clone()
    }
  },

  methods: {
    submitArticle () {
      this.$emit('submit', this.article.clone())
    }
  },

  components: {
    MarkdownRenderer
  }
}
</script>

<style lang="css">
</style>
