<template lang="pug">
.c-markdown-renderer(v-html="formatted")
</template>

<script>
import marked from 'marked'

import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  highlight (code) {
    return highlight.highlightAuto(code).value
  }
})

export default {
  props: {
    body: {
      type: String,
      required: true
    }
  },

  computed: {
    formatted () {
      return marked(this.body)
    }
  }
}
</script>

<style lang="scss">
@import '~core/variables';

.c-markdown-renderer {
  h1 {
    color: $c-color-dark;
    font-size: $c-size-article-h1;
  }

  h2 {
    font-size: $c-size-article-h2;
  }

  h3 {
    font-size: $c-size-article-h3;
  }

  h4 {
    font-size: $c-size-article-h4;
  }
}
</style>
