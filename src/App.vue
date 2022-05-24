<script setup lang="ts">
import Left from './components/Left.vue'
import Right from './components/Right.vue'
</script>

<template>
  <main class="main">
    <Left />
    <Right />
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  width: min(100vw, 1280px);
}

.main {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  .main {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
