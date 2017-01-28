<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
  import Hello from './components/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    },
    created(){

      const postData = {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'AOaEmZRVgAMIh3RvOcoNKIExuWVNk2BHvZL9CGY0',
        username: 'waviq.subkhi@gmail.com',
        password: 'waviq',
        scope: ''
      }

      this.$http.post('http://localhost:5000/oauth/token', postData).then(response => {
        console.log(response)

        const header = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + response.body.access_token
        }

        this.$http.get('http://localhost:5000/api/user', {headers: header})
          .then(response => {
              console.log(response)
          })
      });
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
