<script setup>
import { RouterLink, RouterView } from 'vue-router'
const apiUrl = `https://todoo.5xcamp.us`


</script>

<template>
  <div>
    <RouterView :apiUrl="apiUrl"/>
  </div>

</template>

<style>
  

</style>
