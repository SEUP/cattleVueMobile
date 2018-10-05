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
        /*****************************MaleCattle*************************************** */
        {
            path: '/cattle/male/view',
            name: 'male-view',
            component: loadView('Cattle/Male/view')
        },
        {
            path: '/cattle/male/add',
            name: 'male-add',
            component: loadView('Cattle/Male/add')
        },
        /*****************************FemaleCattle*************************************** */
        {
            path: '/cattle/female/view',
            name: 'female-view',
            component: loadView('Cattle/Female/view')
        },
        {
            path: '/cattle/female/add',
            name: 'female-add',
            component: loadView('Cattle/Female/add')
        },
          /*****************************KhunCattle*************************************** */
          {
            path: '/cattle/khun/view',
            name: 'khun-view',
            component: loadView('Cattle/Khun/view')
        },
        {
            path: '/cattle/khun/add',
            name: 'khun-add',
            component: loadView('Cattle/Khun/add')
        },
          /*****************************YoungCattle*************************************** */
          {
            path: '/cattle/young/view',
            name: 'young-view',
            component: loadView('Cattle/Young/view')
        },
        {
            path: '/cattle/young/add',
            name: 'young-add',
            component: loadView('Cattle/Young/add')
        }
    ]
})
