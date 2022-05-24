<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { useObservableLocalStorage } from '../composables/use-observable-local-storage'
const myObject1 = useLocalStorage('my-object1', {}, { writeDefaults: false })
const myObject2 = useObservableLocalStorage('my-object2', {}, { writeDefaults: false })
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>useLocalStorage</h3>
      <div>{{ myObject1 }}</div>
    </div>
    <div>
      <h3>useObservableLocalStorage</h3>
      <div>{{ myObject2 }}</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.wrapper > div {
  flex: 1;
}
</style>
