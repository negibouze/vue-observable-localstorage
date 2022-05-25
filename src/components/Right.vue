<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { useObservableLocalStorage } from '../composables/use-observable-local-storage'

const object1 = useLocalStorage('my-object1', {}, { writeDefaults: false })
const object2 = useObservableLocalStorage('my-object2', {}, { writeDefaults: false })
</script>

<template>
  <div class="wrapper">
    <div v-for="(v, i) in [object1, object2]" :key="i">
      <h3>{{ i === 0 ? 'useLocalStorage' : 'useObservableLocalStorage' }}</h3>
      <div>{{ v }}</div>
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
