import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'kyara',
        component: require('@/components/kyara').default
    },
    {
        path: '/control',
        name: 'control',
        component: require('@/components/control').default
    },
    {
        path: '*',
        redirect: '/'
    }
  ]
})
