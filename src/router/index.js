import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(`../views/${view}.vue`)
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: loadView('Main')
    }
  ]
})
