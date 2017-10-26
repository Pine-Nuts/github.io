import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Notice from '@/components/Notice'
import Appeal from '@/components/Appeal'
import Fun from '@/components/Fun'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Home
    },{
      path: '/notice',
      name: 'notice',
      component: Notice
    },{
      path: '/appeal',
      name: 'appeal',
      component: Appeal
    },{
      path: '/fun',
      name: 'fun',
      component: Fun
    },{
      path: '/detail',
      name: 'detail',
      component: Detail
    },
  ]
})
