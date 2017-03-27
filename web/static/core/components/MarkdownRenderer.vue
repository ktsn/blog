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
    margin-top: 30px;
    margin-bottom: 10px;
    color: $c-color-dark;
    font-size: $c-size-article-h1;
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 18px;
    padding-bottom: 4px;
    border-bottom: 1px solid $c-color-border-base;
    font-size: $c-size-article-h2;
  }

  h3 {
    position: relative;
    margin-top: 25px;
    margin-bottom: 7px;
    padding-left: 12px;
    font-size: $c-size-article-h3;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -1px;
      height: 2px;
      width: 7px;
      background-color: $c-color-base;
    }
  }

  h4 {
    margin-top: 12px;
    margin-bottom: 4px;
    font-size: $c-size-article-h4;
    font-weight: bold;
  }

  p {
    margin-top: 1em;
  }

  h1, h2, h3, h4, h5, h6 {
    + p {
      margin-top: 0;
    }
  }
}
</style>
