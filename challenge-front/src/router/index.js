import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Customers from '@/components/customers/Customers.vue'
import HomePage from '@/components/customers/HomePage.vue'
import New from '@/components/customers/New.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/new',
      name: 'New',
      component: New
    }
  ]
})
