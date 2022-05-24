<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { reactive, type WritableComputedRef } from 'vue'
import { useObservableLocalStorage } from '../composables/use-observable-local-storage'

type Value = Record<string, string>
type ObjectType = RemovableRef<Value> | WritableComputedRef<Value>
const useMyObject = (obj: ObjectType) => {
  const state = reactive({
    key: '',
    value: '',
  })
  const update = (val: Value) => {
    obj.value = val
    state.key = ''
    state.value = ''
  }
  const addItem = () => {
    update({ ...obj.value, [state.key]: state.value })
  }
  const deleteItem = () => {
    update(Object.fromEntries(Object.entries(obj.value).filter(([key]) => key !== state.key)))
  }
  const canAdd = computed(() => state.key !== '' && state.value !== '')
  const canDelete = computed(() => state.key !== '')
  return { addItem, canAdd, canDelete, deleteItem, state, storage: obj }
}

const object1 = useMyObject(useLocalStorage<Value>('my-object1', {}))
const object2 = useMyObject(useObservableLocalStorage<Value>('my-object2', {}))
</script>

<template>
  <div class="wrapper">
    <div v-for="(v, i) in [object1, object2]" :key="i">
      <h3>{{ i === 0 ? 'useLocalStorage' : 'useObservableLocalStorage' }}</h3>
      <div>
        <label :for="`key${i + 1}}`">Key:</label><br />
        <input type="text" :id="`key${i + 1}}`" v-model="v.state.key" /><br />
        <label :for="`value${i + 1}}`">Value:</label><br />
        <input type="text" :id="`value${i + 1}}`" v-model="v.state.value" /><br /><br />
        <button :disabled="!v.canAdd.value" @click="v.addItem">追加</button>
        <button :disabled="!v.canDelete.value" @click="v.deleteItem">削除</button>
      </div>
      <div style="margin-top: 8px">
        <h3>LocalStorage</h3>
        <div>{{ v.storage }}</div>
      </div>
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
