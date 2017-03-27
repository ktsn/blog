// @flow

let Vue: any

export default function install (_Vue: any, { router, store }: any) {
  Vue = _Vue

  const names = extractAllNames([], router.options.routes)
  const actions = names.reduce((acc, name) => {
    acc[name] = function routingAction (_, payload) {
      router.push({ name, ...payload })
    }
    return acc
  }, {})

  store.registerModule('routing', {
    namespaced: true,
    actions
  })

  Vue.component('store-link', {
    functional: true,
    render (h, { data, children }) {
      return h(
        'router-link',
        {
          ...data,
          props: {
            event: '',
            ...data.props
          },
          nativeOn: {
            click: (event) => {
              if (!data.props.to.name) return

              const { to } = data.props

              event.preventDefault()
              store.dispatch(
                'routing/' + to.name,
                to
              )
            }
          }
        },
        children
      )
    }
  })
}

function extractAllNames (acc: string[], routes: ?any[]): string[] {
  if (!routes) return acc

  return routes.reduce((memo, route) => {
    memo = route.name
      ? memo.concat(route.name)
      : memo

    return extractAllNames(memo, route.children)
  }, acc)
}
