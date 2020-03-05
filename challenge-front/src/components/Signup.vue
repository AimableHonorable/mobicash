<template>
  <div class="container p-5">
    <div class="p-4 mx-auto bg-light border rounded shadow-sm w-50">
      <h3 class="text-2xl mb-6 text-info">Create account</h3>
      <form @submit.prevent="signup">
        <div class="text-danger" v-if="error">{{ error }}</div>
        <div class="form-group">
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Email address">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Password(at least 6 characters)">
        </div>
        <div class="form-group">
          <input type="password" v-model="password_confirmation" class="form-control" id="password_confirmation" placeholder="Password Confirmation">
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-info w-50 rounded-pill">Sign Up</button>
        </div>
        <div class="my-4">Already have account? <router-link to="/" class="text-info">Sign In</router-link></div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/homepage')
      window.location.reload(true)
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/homepage')
        window.location.reload(true)
      }
    }
  }
}
</script>
