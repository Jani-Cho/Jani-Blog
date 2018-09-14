<template>
  <v-container fluid>
    <v-layout row>
      <v-flex>
        <work-type></work-type>
      </v-flex>
    </v-layout>
        <router-view></router-view>
  </v-container>
</template>

<script>
import workType from './workType'

  export default {
    components:{
      'work-type': workType
    },
  }
</script>

