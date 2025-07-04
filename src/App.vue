<script setup>
import { useRoute } from 'vue-router'

// Import component
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div class="container">
    <!-- Luôn hiển thị Header -->
    <Header />

    <!-- Nội dung trang -->
    <router-view />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.container {
  max-width: none;
  padding: 0;
  margin: 0;
}
</style>
