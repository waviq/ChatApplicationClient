<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

  import NavBar from './components/NavBar'

  export default{
    created(){
      console.log('created, horeee...')
    },

    components:{
      NavBar
    }
  }


</script>

<style>

</style>
