import Vue from 'vue';
import Router from 'vue-router';
import Main from "@/components/Main";
import Home from '@/components/main/Home';
import Connect from '@/components/main/Connect';
import Load from "@/components/Load";
import Register from '@/components/load/Register';
import Login from "@/components/load/Login";
import Me from "@/components/Me";
import Detail from '@/components/Detail';
import MSG from "@/components/detail/Message";
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
          path: 'connect',
          name: 'connect',
          component: Connect
        }
      ]
    },{
      path: '/detail',
      name: 'detail',
      component: Detail,
      children: [
        {
          path: '',
          name: 'msg',
          component: MSG
        }
      ]
    },{
      path: '/me',
      name: 'me',
      component: Me
    }
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
  if(to.name == 'login'){
    store.commit('app/changeNav','l')
  }
  if(to.name == 'register'){
    store.commit('app/changeNav','r')
  }
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
