// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import * as firebase from 'firebase'
import AlertCmp from  './components/Shared/alert.vue'


Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyABiwMYtI7xu0Ej_3p0SelGEbqbt0qZGjU',
      authDomain: 'jani-blog.firebaseapp.com',
      databaseURL: 'https://jani-blog.firebaseio.com',
      projectId: 'jani-blog',
      storageBucket: 'jani-blog.appspot.com',
      messagingSenderId: '172596029319'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    //載入firebase works資料
    this.$store.dispatch('loadWorks')
  },

})
