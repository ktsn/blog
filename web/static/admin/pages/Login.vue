<template lang="pug">
form.c-login(@submit.prevent="login({ email, password })")
  h1.c-login-title Login
  input.c-login-input(type="text" name="email" v-model="email")
  input.c-login-input(type="password" name="password" v-model="password")
  button.c-login-submit.button(type="submit") Send
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  computed: mapGetters('auth', [
    'authenticated'
  ]),

  methods: {
    ...mapActions('auth', [
      'login'
    ]),
    ...mapActions('routing', [

    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
