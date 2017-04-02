// @flow

import * as Auth from 'admin/ajax/auth'

const state = {
  authenticated: false
}

const getters = {
  authenticated: (state: typeof state) => state.authenticated
}

const actions = {
  login ({ commit }: any, { email, password }: any) {
    Auth.login(email, password)
      .then(() => commit('authenticateSuccess'))
  }
}

const mutations = {
  authenticateSuccess (state: typeof state) {
    state.authenticated = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
