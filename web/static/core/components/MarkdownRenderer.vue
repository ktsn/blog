<template lang="pug">
.markdonw-renderer(v-html="formatted")
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
</style>
