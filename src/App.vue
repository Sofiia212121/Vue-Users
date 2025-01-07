<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <br>
  <br>

  <div class="container">
    <RouterView />
  </div>
</template>
