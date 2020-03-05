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
  <div class="w-75 float-right p-5">
    <!-- customers list -->
    <h4 class="text-center text-info">Customers list</h4>
    <table class="table shadow-sm border mr-4">
      <thead class="thead-light">
        <th>Customer name</th>
        <th>Phone number</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr class="py-4" v-for="customer in customers" :key="customer.id" :artist="customer">
            <td>
              {{ customer.name }}
              <div v-if="customer == editedCustomer">
                <form action="" @submit.prevent="updateCustomer(customer)">
                  <div class="form-group">
                    <input class="form-control w-50 mr-2 mb-2" v-model="customer.name" />
                    <input class="form-control w-50 mr-2" maxlength="10" v-model="customer.phone" />
                  </div>
                    <input type="submit" value="Update" class="btn btn-info btn-sm">
                </form>
              </div>
            </td>
            <td>
              {{ customer.phone }}
            </td>
            <td>
            <button class="btn btn-outline-info btn-sm"
            @click.prevent="editCustomer(customer)">Edit</button>
            <button class="btn btn-outline-danger btn-sm"
           @click.prevent="removeCustomer(customer)">Delete</button>
           </td>

        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <!-- pdf print -->
      <form class="w-full max-w-sm" method="GET" action="http://localhost:3000/api/v1/customerpdf">
        <input type="submit"  class="btn btn-info shadow-sm" value="Print customers list">
      </form>
    </div>

  </div>

</div>
</template>
<script>
export default {
  name: 'Customers',
  data () {
    return {
      customers: [],
      error: '',
      editedCustomer: ''
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
    removeCustomer (customer) {
      this.$http.secured.delete(`/api/v1/customers/${customer.id}`)
        .then(response => {
          this.customers.splice(this.customers.indexOf(customer), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete customer'))
    },
    editCustomer (customer) {
      this.editedCustomer = customer
    },
    updateCustomer (customer) {
      this.editedCustomer = ''
      this.$http.secured.patch(`/api/v1/customers/${customer.id}`, { customer: { name: customer.name, phone: customer.phone } })
        .catch(error => this.setError(error, 'Cannot update customer'))
    }
  }
}
</script>
<style scoped="true">
  a:hover{
    text-decoration: none;
  }
</style>
