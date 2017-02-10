<template>
  <div class="login">
    <div class="container">
      <h1 class="login-title">Login Page</h1>
      <div class="row">
        <form v-on:submit.prevent="handleLoginFormSubmit()" class="col s12">
          <div class="row">
            <div class="input-field col s6 offset-m3">
              <input id="email" type="email" class="validate" v-model="login.email">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 offset-m3">
              <input id="password" type="password" class="validate" v-model="login.password">
            </div>
          </div>

          <div class="row">
            <div class="input-field col s6 offset-m3">
              <button type="submit" class="waves-effect waves-light btn login-btn">Login</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<style>
  .login-title{
    text-align: center;
    font-size: 40px;
    opacity: 0.87;
    font-weight: 700;
  }
</style>
<script>
  import {loginUrl, userUrl, getHeader} from './../config'
  import {clientId, clientSecret} from './../env'
  export default{
    data(){
      return {
        login: {
          email: 'waviq.subkhi@gmail.com',
          password: 'waviq'
        }
      }
    },
    methods: {
      handleLoginFormSubmit(){
        const postData = {
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          username: this.login.email,
          password: this.login.password,
          scope: ''
        }
        const authUser = {}
        this.$http.post(loginUrl, postData)
          .then(response => {
            if (response.status === 200){
              console.log('Oauth token', response)
              authUser.access_token = response.data.access_token
              authUser.refresh_token = response.data.refresh_token
              window.localStorage.setItem('authUser', JSON.stringify(authUser,null,4))
              this.$http.get(userUrl, {headers: getHeader()})
                .then(response => {
                  console.log('User object', response)
                  authUser.email = response.body.email
                  authUser.name = response.body.name
                  window.localStorage.setItem('authUser', JSON.stringify(authUser))
                  this.$router.push({name: 'dashboard'})
                })
            }
          })
      }
    }
  }
</script>


