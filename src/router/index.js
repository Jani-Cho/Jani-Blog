import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Blogs from '@/components/Blogs/Blogs.vue'
import AddPost from '@/components/Blogs/addPost.vue'
import SinglePost from '@/components/Blogs/singlePost.vue'
import Login from '@/components/User/Login.vue'
import SignIn from '@/components/User/signIn.vue'
import SignUp from '@/components/User/signUp.vue'

import Profile from '@/components/User/Profile.vue'
import Works from '@/components/Works/Works.vue'
import AddWork from '@/components/Works/addWork.vue'
import JsWorks from '@/components/Works/jsWorks.vue'
import CssWorks from '@/components/Works/cssWorks.vue'
import VueWorks from '@/components/Works/vueWorks.vue'
import AllWorks from '@/components/Works/allWorks.vue'

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
      path: '/about',
      name: 'About',
      component: About
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
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
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
      // beforeEnter: AuthGuard
      children: [
        { 
          path : '/works/all', 
          component: AllWorks
        },
        { 
          path: '/works/js',
          name: 'JsWorks',
          component: JsWorks,
        },
        { 
          path: '/works/css',
          name: 'CssWorks',
          component: CssWorks,
        },
        { 
          path: '/works/vue',
          name: 'VueWorks',
          component: VueWorks,
        }
      ]
    },
    {
      path: '/work/add',
      name: 'AddWorks',
      component: AddWork,
      // beforeEnter: AuthGuard
    },
  ]
})
