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
  return { addItem, canAdd, canDelete, deleteItem, state }
}

const object1 = useMyObject(useLocalStorage<Value>('my-object1', {}))
const object2 = useMyObject(useObservableLocalStorage<Value>('my-object2', {}))
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>useLocalStorage</h3>
      <div>
        <label for="key1">Key:</label><br />
        <input type="text" id="key1" v-model="object1.state.key" /><br />
        <label for="value1">Value:</label><br />
        <input type="text" id="value1" v-model="object1.state.value" /><br /><br />
        <button :disabled="!object1.canAdd.value" @click="object1.addItem">追加</button>
        <button :disabled="!object1.canDelete.value" @click="object1.deleteItem">削除</button>
      </div>
    </div>
    <div>
      <h3>useObservableLocalStorage</h3>
      <div>
        <label for="key2">Key:</label><br />
        <input type="text" id="key2" v-model="object2.state.key" /><br />
        <label for="value2">Value:</label><br />
        <input type="text" id="value2" v-model="object2.state.value" /><br /><br />
        <button :disabled="!object2.canAdd.value" @click="object2.addItem">追加</button>
        <button :disabled="!object2.canDelete.value" @click="object2.deleteItem">削除</button>
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
