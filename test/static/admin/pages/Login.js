import td from 'testdouble'
import Vue from 'vue'
import { Store } from 'vuex'
import Login from 'admin/pages/Login'

describe('Admin Login page', () => {
  it('sends login request', () => {
    const store = new Store({
      modules: {
        auth: { namespaced: true }
      }
    })
    store.dispatch = td.function()

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
})

function mount (options, fn) {
  const LoginCtor = Vue.extend(Login)
  const vm = new LoginCtor(options).$mount()
  document.body.appendChild(vm.$el)

  const email = vm.$el.querySelector('[name="email"]')
  const password = vm.$el.querySelector('[name="password"]')
  const submit = vm.$el.querySelector('[type="submit"]')

  fn({ email, password, submit })

  document.body.removeChild(vm.$el)
  vm.$destroy()
}
