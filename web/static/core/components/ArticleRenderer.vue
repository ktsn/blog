<template lang="pug">
article.c-article-renderer
  h1.c-article-renderer-title(v-text="article.title")
  markdown-renderer.c-article-renderer-body(:body="article.body")
</template>

<script>
import MarkdownRenderer from './MarkdownRenderer'

export default {
  components: {
    MarkdownRenderer
  },

  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~core/variables';

.c-article-renderer {
  &-title {
    color: $c-color-dark;
    font-size: $c-size-article-h1;
  }
}
</style>
