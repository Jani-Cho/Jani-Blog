<template>
  <v-container>
    <v-layout row wrap class="mt-3">
      <v-flex xs-12 sm4 class="text-xs-center text-sm-right">
        <v-btn large router to="/works/js" class="secondary">JS作品</v-btn>
      </v-flex>
      <v-flex xs-12 sm4 class="text-xs-center text-sm-center">
        <v-btn large router to="/works/css" class="secondary">HTML5+ CSS3作品</v-btn>
      </v-flex>
      <v-flex xs-12 sm4 class="text-xs-center text-sm-left">
        <v-btn large router to="/works/vue" class="secondary">VUE作品</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import jsWorks from './jsWorks'
  export default {
    components:{


    },
    computed: {
      updateWorks () {
        return this.$store.getters.fearuredWorks
      }
    },
    methods:{
      onLoadWork(id){
        this.$router.push('/work/' + id)
      }
    }
  }
</script>

