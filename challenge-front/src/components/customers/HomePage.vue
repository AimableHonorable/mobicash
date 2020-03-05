<template>
  <div>
    <div id="Sidebar" class="d-block float-left w-25 bg-light border shadow p-2" style="min-height: 100vh;">
      <!-- pdf print -->
      <form class="w-full max-w-sm" method="GET" action="http://localhost:3000/api/v1/customerpdf">
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
      </form>
    </div>
    <div class="w-75 float-right">
      <div class="mr-4 mt-4 w-50 ml-auto">
        <input type="text" name="todoId" size="40" maxlength="256" placeholder="search todos by id" class="form-control mr-sm-2 rounded-pill" v-model="todoId">
      </div>
      <div class="card border-0 bg-transparent">
        <div class="card-body texxt-danger" id="searchedProduct">
          <div class="text-danger">{{ productName }}</div>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-center text-info">How this app work</h3>
        <div class="card-deck">
          <div class="card">
            <img src="/assets/search.svg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5>You can easily search any product by a given todoId!</h5>
            </div>
          </div>
          <div class="card">
            <img src="/assets/add.svg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5>You can register a customer!</h5>
            </div>
          </div>
          <div class="card">
            <img src="/assets/list.svg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5>You can view the customers list and their details!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'HomePage',
  data () {
    return {
      todoId: '',
      productName: ''
    }
  },
  watch: {
    todoId: function () {
      this.productName = ''
      if (this.todoId.length >= 1) {
        this.lookuptodoId()
      }
    }
  },
  methods: {
    lookuptodoId: function () {
      var thisApp = this
      thisApp.productName = 'Please wait...'
      axios.get('https://jsonplaceholder.typicode.com/todos/' + thisApp.todoId)
        .then(function (response) {
          thisApp.productName = 'Todo: ' + response.data.title
        })
    }
  }
}
</script>
<style scoped="true">
  a:hover{
    text-decoration: none;
  }
</style>
