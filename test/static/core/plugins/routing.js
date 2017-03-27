import assert from 'power-assert'
import Vue from 'vue'
import VueRouter from 'vue-router'
import sinon from 'sinon'
import routing from 'core/plugins/routing'

describe('routing plugin', () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { name: 'foo', path: '/foo' },
      { path: '/no-name' },
      { name: 'bar', path: '/bar', children: [
        { name: 'baz', path: '/baz' }
      ] }
    ]
  })

  const store = {
    registerModule: sinon.spy(),
    dispatch: sinon.spy()
  }

  before(() => {
    Vue.use(routing, {
      router,
      store
    })
  })

  it('registers actions that corresponding with routing', () => {
    assert(store.registerModule.callCount === 1)
    assert(store.registerModule.lastCall.args[0] === 'routing')

    const { actions } = store.registerModule.lastCall.args[1]

    assert(typeof actions.foo === 'function')
    assert(typeof actions.bar === 'function')
    assert(typeof actions.baz === 'function')
    assert(typeof actions['no-name'] === 'undefined')
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

    const { args } = store.dispatch.lastCall
    assert(args[0] === 'routing/foo')
    assert(args[1].name === 'foo')
  })
})
