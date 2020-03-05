<template>
  <header class="shadow-sm sticky-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand text-info" href="#"><h2>Customer App</h2></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link text-info" v-if="!signedIn()">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link text-info" v-if="!signedIn()">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="signOut" class="nav-link btn btn-danger text-white" v-if="signedIn()">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
          window.location.reload(true)
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
