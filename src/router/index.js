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
            component: loadView('Main')
        },
        {
            path: '/main/profile',
            name: 'farmer-profile',
            component: loadView('Farmer/Profile')
        },
        {
            path: '/main/farm',
            name: 'farmer-farm',
            component: loadView('Farmer/Farm')
        },
        {
            path: '/cattle/male/view',
            name: 'male-view',
            component: loadView('Cattle/Male/view')
        }
    ]
})
