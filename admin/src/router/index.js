import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
import Goods from '@/views/goods/index'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Layout',
        component: Layout
    }, {
        path: '/goods',
        name: 'Goods',
        component: Goods
    }]
})