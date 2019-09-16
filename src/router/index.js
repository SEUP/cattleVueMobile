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
            path: '/register',
            name: 'register',
            component: loadView('Register')
        },
        {
            path: '/main',
            name: 'main',
            component: loadView('Main')
        },
        {
            path: '/about',
            name: 'about',
            component: loadView('About')
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
            path: '/cattle/profile',
            name: 'cattle-profile',
            props: true,
            component: loadView('Cattle/Core/profile')
        },
         /*****************************MaleCattle*************************************** */
        {
            path: '/cattle/male/view',
            name: 'male-view',
            props: true,
            component: loadView('Cattle/Male/view')
        },
        {
            path: '/cattle/male/add',
            name: 'male-add',
            props: true,
            component: loadView('Cattle/Male/add')
        },
        /*****************************FemaleCattle*************************************** */
        {
            path: '/cattle/female/view',
            name: 'female-view',
            props: true,
            component: loadView('Cattle/Female/view')
        },
        {
            path: '/cattle/female/add',
            name: 'female-add',
            props: true,
            component: loadView('Cattle/Female/add')
        },
          /*****************************KhunCattle*************************************** */
          {
            path: '/cattle/khun/view',
            name: 'khun-view',
            props: true,
            component: loadView('Cattle/Khun/view')
        },
        {
            path: '/cattle/khun/add',
            name: 'khun-add',
            props: true,
            component: loadView('Cattle/Khun/add')
        },
          /*****************************YoungCattle*************************************** */
          {
            path: '/cattle/young/view',
            name: 'young-view',
            props: true,
            component: loadView('Cattle/Young/view')
        },
        {
            path: '/cattle/young/add',
            name: 'young-add',
            props: true,
            component: loadView('Cattle/Young/add')
        },
        /**********************************Manage Cattle***************************************** */
        {
            path: '/cattle/manage',
            name: 'cattle-manage',
            props: true,
            component: loadView('Cattle/Core/manage')
        },
        {
            path: '/cattle/manage/change-type',
            name: 'change-type',
            props: true,
            component: loadView('Cattle/Core/Manage/ChangeType')
        },
        {
            path: '/cattle/manage/Female-Breeder',
            name: 'Female-Breeder',
            props: true,
            component: loadView('Cattle/Core/Manage/FemaleBreeder')
        },
        {
            path: '/cattle/manage/Female-Breeder/create',
            name: 'Female-Breeder-create',
            props: true,
            component: loadView('Cattle/Core/Manage/Breeder/create')
        },
        {
            path: '/cattle/sell',
            name: 'sell',
            props: true,
            component: loadView('Cattle/Sell/sell')
        },
        {
            path: '/noti',
            name: 'noti',
            props: true,
            component: loadView('Noti/noti')
        },
        {
            path: '/question',
            name: 'question',
            component: loadView('Question')
        },
    ]

})
