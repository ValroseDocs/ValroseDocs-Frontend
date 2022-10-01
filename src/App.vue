<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Home from './components/Home.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div id="content" class="flex-grow">
      <Home />
    </div>
    <Footer />
  </div>
</template>

