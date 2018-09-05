import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blogs from '@/components/Blogs/Blogs.vue'
import AddPost from '@/components/Blogs/addPost.vue'
import SinglePost from '@/components/Blogs/singlePost.vue'
import Login from '@/components/User/Login.vue'
import Profile from '@/components/User/Profile.vue'
import Works from '@/components/Works/Works.vue'
import AddWork from '@/components/Works/addWork.vue'
import Work from '@/components/Works/Work.vue'
import JsWorks from '@/components/Works/jsWorks.vue'
import CssWorks from '@/components/Works/cssWorks.vue'
import VueWorks from '@/components/Works/vueWorks.vue'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs,
      // beforeEnter: AuthGuard
    },
    {
      path: '/blog/add',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/blog/:id',
      name: 'SinglePost',
      component: SinglePost
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/works',
      name: 'Works',
      component: Works,
      beforeEnter: AuthGuard
    },
    {
      path: '/works/js',
      name: 'JsWorks',
      component: JsWorks,
      beforeEnter: AuthGuard
    },
    {
      path: '/works/css',
      name: 'CssWorks',
      component: CssWorks,
      beforeEnter: AuthGuard
    },
    {
      path: '/works/vue',
      name: 'VueWorks',
      component: VueWorks,
      beforeEnter: AuthGuard
    },
    {
      path: '/work/add',
      name: 'AddWorks',
      component: AddWork,
      beforeEnter: AuthGuard
    },
  ]
})
