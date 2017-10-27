import Vue from 'vue';
import Router from 'vue-router';
import Main from "@/components/Main";
import Login from "@/components/Login";
import Detail from '@/components/Detail';
import Home from '@/components/main/Home';
import Notice from '@/components/main/Notice';
import Appeal from '@/components/main/Appeal';
import Fun from '@/components/main/Fun';
import store from "./../store"


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
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
