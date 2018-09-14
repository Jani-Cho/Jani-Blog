<template>
  <v-app>
    <!-- 手機版選單 -->
    <v-navigation-drawer
      v-model="sideNav"
      absolute
      temporary>
      <v-list class="pa-1">
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        v-if="!userIsAuthenticated"          
        @click="login">
          <v-list-tile-action>
            <v-icon dark>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>登入</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon dark>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>登出</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

    </v-navigation-drawer>
    <!-- 電腦版選單 -->
    <v-toolbar fixed flat>
      <!-- 漢堡選單：sm和以上的尺寸隱藏 -->
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up ">
      </v-toolbar-side-icon>
      
      <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">Jani Cho 作品集</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <!-- 導覽列：在xs尺寸隱藏 -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="!userIsAuthenticated"
          flat
          @click="login">
        <v-icon left dark>lock_open</v-icon>
          登入
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          登出
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- 主要內容 -->
    <main>
      <router-view></router-view>
    </main>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
      }
    },
    computed:{
      menuItems (){
        let menuItems = [
          { icon: 'supervisor_account', title: '首頁', link: '/' },
          { icon: 'room', title: '文章', link: '/blogs' },
          { icon: 'person', title: '作品', link: '/works/all' },   
          // { icon: 'lock_open', title: '登入', link: '/login' },      
        ]
        // if (this.userIsAuthenticated) {
          //   menuItems = [
            //   { icon: 'supervisor_account', title: '首頁', link: '/' },
            //   { icon: 'room', title: '文章', link: '/blogs' },
            //   { icon: 'person', title: '作品', link: '/works/all' },         
          //   ]
          // }
        //console.log('userIsAuthenticatedthis', this.userIsAuthenticated)
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        // console.log(this.$store.getters.user)
      }

    },
    methods: {

      /* 登出：跳到登入頁 */
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },

      /* 進入登入頁 */
      login () {
        this.$router.push('/login')
      },
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>