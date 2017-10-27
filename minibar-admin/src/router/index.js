import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import UL from "@/components/User/UsersList"
import UE from "@/components/User/UsersEditor"
import AL from "@/components/Article/ArticlesList"
import AE from "@/components/Article/ArticlesEditor"
import RL from "@/components/Reply/ReplysList"
import RE from "@/components/Reply/ReplysEditor"
import TL from "@/components/Tag/TagsList"
import TE from "@/components/Tag/TagsEditor"
import store from "./../store"
import { isLogined } from "./../utils/tools";
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        loginpage: true
      }
    },{
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path: '',
          name: 'UL',
          component: UL
        },{
          path: 'user_editor',
          name: 'UE',
          component: UE
        },{
          path: 'article_list',
          name: 'AL',
          component: AL
        },{
          path: 'article_editor',
          name: 'AE',
          component: AE
        },{
          path: 'reply_list',
          name: 'RL',
          component: RL
        },{
          path: 'reply_editor',
          name: 'RE',
          component: RE
        },{
          path: 'tag_list',
          name: 'TL',
          component: TL
        },{
          path: 'tag_editor',
          name: 'TE',
          component: TE
        },
      ]
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
  if(to.name == 'UL'){
    store.commit('app/changeNav','1-1')
  }
  if(to.name == 'UE'){
    store.commit('app/changeNav','1-2')
  }
  if(to.name == 'AL'){
    store.commit('app/changeNav','2-1')
  }
  if(to.name == 'AE'){
    store.commit('app/changeNav','2-2')
  }
  if(to.name == 'RL'){
    store.commit('app/changeNav','3-1')
  }
  if(to.name == 'RE'){
    store.commit('app/changeNav','3-2')
  }
  if(to.name == 'TL'){
    store.commit('app/changeNav','4-1')
  }
  if(to.name == 'TE'){
    store.commit('app/changeNav','4-2')
  }
})
export default router
