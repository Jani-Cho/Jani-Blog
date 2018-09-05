<template>
  <v-container>
    <v-layout row wrap class="mt-3">
      <v-flex xs-12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/blogs" class="secondary">文章列表</v-btn>
      </v-flex>
      <v-flex xs-12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/works" class="secondary">作品列表</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12>
        <v-carousel hide-controls style="cursor: pointer">
          <v-carousel-item
          v-for="work in updateWorks"
          :src="work.imageUrl"
          :key="work.id"
          @click="onLoadWork(work.id)"
          >
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

 
  </v-container>
</template>

<script>
  export default {
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

