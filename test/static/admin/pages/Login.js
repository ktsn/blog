import td from 'testdouble'
import Vue from 'vue'
import { Store } from 'vuex'
import Login from 'admin/pages/Login'

describe('Admin Login page', () => {
  let store

  beforeEach(() => {
    store = new Store({
      modules: {
        auth: {
          namespaced: true,
          state: {
            authenticated: false
          },
          getters: {
            authenticated: state => state.authenticated
          }
        },
        routing: { namespaced: true }
      }
    })
    store.dispatch = td.function()
  })

  it('sends login request', () => {
    mount({ store }, ({ email, password, submit }) => {
      email.value = 'test@example.com'
      email.dispatchEvent(new Event('input'))
      password.value = 'password'
      password.dispatchEvent(new Event('input'))
      submit.click()

      td.verify(
        store.dispatch('auth/login', {
          email: 'test@example.com',
          password: 'password'
        })
      )
    })
  })

  it('redirects aritcle creation page if login is succeeded', done => {
    mount({ store }, () => {
      store.state.auth.authenticated = true

      Vue.nextTick(() => {
        td.verify(
          store.dispatch('routing/newArticle')
        )
        done()
      })
    })
  })

  it('redirects if already logged in', () => {
    store.state.auth.authenticated = true

    mount({ store }, () => {
      td.verify(
        store.dispatch('routing/newArticle')
      )
    })
  })
})

function mount (options, fn) {
  const LoginCtor = Vue.extend(Login)
  const vm = new LoginCtor(options).$mount()
  document.body.appendChild(vm.$el)

  const email = vm.$el.querySelector('[name="email"]')
  const password = vm.$el.querySelector('[name="password"]')
  const submit = vm.$el.querySelector('[type="submit"]')

  fn({ email, password, submit })

  Vue.nextTick(() => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  })
}
