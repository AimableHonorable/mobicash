<template class="border rounded">
<div class="">
  <div id="Sidebar" class="d-block float-left w-25 bg-light border shadow p-2" style="min-height: 100vh;">
    <div class="p-2">
      <p class="py-2 border-bottom">
      <router-link to= "/homepage" class="text-dark">Home</router-link>
      </p>
      <p class="py-2 border-bottom">
      <router-link to= "/customers" class="text-dark">Customers</router-link>
      </p>
      <p class="py-2 border-bottom">
      <router-link to= "/new" class="text-dark">Add new Customer</router-link>
      </p>
    </div>

  </div>
  <div class="w-75 float-right py-5">
    <div class="w-50 mx-auto border rounded shadow bg-light text-center p-4">
      <div class="text-danger" v-if="error">{{ error }}</div>
      <h3 class="text-info ">Add a new customer</h3>
      <!-- customer creation form -->
      <form action="" @submit.prevent="addCustomer">
        <div class="form-group">
          <input class="form-control border rounded ml-auto" autofocus autocomplete="off" placeholder="Full name" v-model="newCustomer.name" />
        </div>
        <div class="form-group">
          <input class="form-control border rounded ml-auto" autofocus autocomplete="off" placeholder="Phone number" maxlength="10" v-model="newCustomer.phone" />
        </div>
        <input type="submit" value="Add customer" class="btn btn-outline-info btn-sm" />
      </form>
    </div>

  </div>

</div>
</template>
<script>
export default {
  name: 'New',
  data () {
    return {
      newCustomer: [],
      error: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/customers')
        .then(response => { this.customers = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addCustomer () {
      const value = this.newCustomer
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/customers/', { customer: { name: this.newCustomer.name, phone: this.newCustomer.phone } })

        .then(response => {
          this.customers.push(response.data)
          this.newCustomer = ''
          this.$router.replace('/customers')
        })
        .catch(error => this.setError(error, 'Cannot create customer'))
    }
  }
}
</script>
<style scoped="true">
  a:hover{
    text-decoration: none;
  }
</style>
