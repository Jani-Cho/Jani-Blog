<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      absolute
      temporary
    >
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
        v-if="userIsAuthenticated"
          
          @click="onLogout">
          <v-list-tile-action>
            <v-icon dark>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Jani Cho</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout

        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

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
          { icon: 'person', title: '作品', link: '/works' },   
          { icon: 'lock_open', title: '登入', link: '/login' },      
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
          { icon: 'supervisor_account', title: '首頁', link: '/' },
          { icon: 'room', title: '文章', link: '/blogs' },
          { icon: 'person', title: '作品', link: '/works' },         
          { icon: 'add_box', title: '新增作品', link: '/work/add' },
          ]
        }
        // console.log('userIsAuthenticatedthis', this.userIsAuthenticated)
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        // console.log(this.$store.getters.user)
      }

    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>