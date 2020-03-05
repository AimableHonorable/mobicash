<template>
  <div class="container m-auto p-5">
    <div class="w-50 sm:w-100 mx-auto p-10 bg-light border rounded shadow-sm p-4">
      <h3 class="text-info text-center mb-2">Sign In</h3>
      <form @submit.prevent="signin">
        <div class="text-danger" v-if="error">{{ error }}</div>
        <div class="form-group">
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Email address">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-info w-50 rounded-pill">Sign In</button>
        </div>
        <div class="my-4">If you don't have account yet! <router-link to="/signup" class="text-info">Sign up</router-link></div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/homepage')
      window.location.reload(true)
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/homepage')
        window.location.reload(true)
      }
    }
  }
}
</script>
