import assert from 'power-assert'
import Vue from 'vue'
import VueRouter from 'vue-router'
import td from 'testdouble'
import routing from 'core/plugins/routing'

describe('routing plugin', () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { name: 'foo', path: '/foo' },
      { path: '/no-name' },
      { name: 'bar', path: '/bar', children: [
        { name: 'baz', path: 'baz' }
      ] }
    ]
  })
  router.push = td.function('push')

  const store = {
    registerModule: td.function('registerModule'),
    dispatch: td.function('dispatch')
  }

  before(() => {
    Vue.use(routing, {
      router,
      store
    })
  })

  it('registers actions that corresponding with routing', () => {
    td.verify(
      store.registerModule(
        'routing',
        td.matchers.argThat(({ actions: a }) => {
          return (
            typeof a.foo === 'function'
            && typeof a.bar === 'function'
            && typeof a.baz === 'function'
            && typeof a['no-name'] === 'undefined'
          )
        })
      ), { times: 1 }
    )
  })

  it('intercepts clicking link and dispatch a routing action', () => {
    const vm = new Vue({
      router,
      store,

      render: h => {
        return h('store-link', {
          props: {
            to: {
              name: 'foo'
            }
          }
        })
      }
    }).$mount()

    assert(vm.$el.getAttribute('href') === '/foo')

    vm.$el.click()

    td.verify(
      store.dispatch('routing/foo', td.matchers.contains({
        name: 'foo'
      })), {
        times: 1
      }
    )
  })

  it('treats to as routing name if it is string', () => {
    const vm = new Vue({
      router,
      store,

      render: h => {
        return h('store-link', {
          props: {
            to: 'bar'
          }
        })
      }
    }).$mount()

    assert(vm.$el.getAttribute('href') === '/bar')

    vm.$el.click()

    td.verify(
      store.dispatch('routing/bar', td.matchers.contains({
        name: 'bar'
      })), {
        times: 1
      }
    )
  })
})
