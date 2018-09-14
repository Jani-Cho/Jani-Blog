<template>
  <v-container>
    <v-layout row wrap class="mt-2 mb-5">
      <v-flex xs12 class="text-xs-center">
        <v-btn large router to="/works/all" exact-active-class="error">ALL</v-btn>
        <v-btn large router to="/works/js" exact-active-class="primary">JS作品</v-btn>
        <v-btn large router to="/works/css" exact-active-class="primary">HTML5+ CSS3作品</v-btn>
        <v-btn large router to="/works/vue" exact-active-class="primary">VUE作品</v-btn>
        <v-btn small dark router to="/work/add" exact-active-class="success">+ 新增作品</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
  

