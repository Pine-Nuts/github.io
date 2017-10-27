import Vue from 'vue';
import Router from 'vue-router';
import Main from "@/components/Main";
import Load from "@/components/Load";
import Register from '@/components/load/Register';
import Login from "@/components/load/Login";
import Detail from '@/components/Detail';
import Home from '@/components/main/Home';
import Notice from '@/components/main/Notice';
import Appeal from '@/components/main/Appeal';
import Fun from '@/components/main/Fun';
import store from "./../store"
import { isLogined } from "./../utils/tools";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/load',
      name: 'load',
      component: Load,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
          meta: {
            loginpage: true
          },
        },{
          path: 'register',
          name: 'register',
          component: Register,
          meta: {
            loginpage: true
          },
      }]
    },{
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },{
          path: 'notice',
          name: 'notice',
          component: Notice
        },{
          path: 'appeal',
          name: 'appeal',
          component: Appeal
        },{
          path: 'fun',
          name: 'fun',
          component: Fun
        }
      ]
    },{
      path: '/detail',
      name: 'detail',
      component: Detail
    },
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta.loginpage){
    if(isLogined()){
      next({
        name: 'main'
      })
    } else {
      next()
    }
  } else {
    if(isLogined()){
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
})
router.afterEach((to,from)=>{
  if(to.name == 'home'){
    store.commit('app/changeNav','1')
  }
  if(to.name == 'notice'){
    store.commit('app/changeNav','2')
  }
  if(to.name == 'appeal'){
    store.commit('app/changeNav','3')
  }
  if(to.name == 'fun'){
    store.commit('app/changeNav','4')
  }
})
export default router
