<template>
  <v-container fluid>
    <v-layout row>
      <v-flex>
        <js-works></js-works>
        <css-works></css-works>
        <vue-works></vue-works>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import jsWorks from './jsWorks'
import cssWorks from './cssWorks'
import vueWorks from './vueWorks'

  export default {
    components:{
      'js-works': jsWorks,
      'css-works': cssWorks,
      'vue-works': vueWorks,


    },
  }
</script>