<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div id="content" class="flex-grow">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

