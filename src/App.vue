<script setup>
  import {PATH} from '@/stores/Url'
  import {Header, Body} from './views'
</script>
<script>
  import {User} from '@/stores/User'
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    mounted() {
      if (User.darkMode) {
        document.body.classList.add('darkmode');
      }
    }
  }
</script>

<template>
  <Header />
  <Body :key="PATH.key(0)" />
</template>

<style>
</style>
