<template>
  <v-container fluid>
    <v-layout row id="home">
      <v-flex class="sm12">
        <h3 class="text-md-center mb-3" >Hello, I am Jani Cho, a junior Front-end Engineer.
您好，我叫卓竫雯這裡記錄我學習前端技術的過程與成果...</h3>

        <h3 class="text-md-center mb-3">前端筆記</h3>
        <blog-app></blog-app>
        <h1 class="text-md-center mb-3">前端作品</h1>
        <work-app></work-app>
      </v-flex>

    </v-layout>

 
  </v-container>
</template>

<script>
import Blogs from './Blogs/Blogs.vue'
import AllWorks from './Works/allWorks.vue'


export default {
  components:{
    'blog-app' : Blogs,
    'work-app' : AllWorks
  },
    data () {
      return {
      }
    },

  }
</script>
