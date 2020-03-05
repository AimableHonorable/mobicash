
<template>
  <div id="app">
    <div class="header">
        <Header/>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
