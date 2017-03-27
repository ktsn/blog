<template lang="pug">
.article-form
  form.article-form-inner(@submit.prevent="submitArticle")
    label.article-form-group
      span.article-form-label Title
      input.article-form-input(type="text" v-model="article.title")
    label.article-form-group
      span.article-form-label Body
      textarea.article-form-body(v-model="article.body")
    .article-form-buttons
      button.button(type="submit") Submit
  article-renderer.article-preview(:article="article")
</template>

<script>
import ArticleRenderer from 'core/components/ArticleRenderer'
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
    ArticleRenderer
  }
}
</script>

<style lang="scss">
@import "~core/variables";

.article-form {
  display: flex;
  justify-content: space-between;
  width: 100%;

  &-inner {
    margin-right: 10px;
    max-width: 50%;
    flex: 0 1 50%;
  }

  &-group {
    display: block;
    margin-bottom: 12px;
  }

  &-label {
    display: block;
    margin-bottom: 5px;
    font-size: 1.4rem;
    font-weight: bold;
  }

  &-input,
  &-body {
    display: block;
    width: 100%;
  }

  &-body {
    min-height: 300px;
  }

  &-buttons {
    margin-top: 30px;
    text-align: right;
  }
}

.article-preview {
  margin-left: 10px;
  max-width: 50%;
  flex: 0 0 50%;
}
</style>
