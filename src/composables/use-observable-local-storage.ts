import { computed } from 'vue'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import type { WritableComputedRef } from 'vue'
import type { MaybeRef, StorageOptions } from '@vueuse/core'

type AcceptableType = keyof typeof StorageSerializers
type AvailableKeys = 'my-object2'

export type Type = <T>(
  key: AvailableKeys,
  initialValue: MaybeRef<T>,
  options?: StorageOptions<T>
) => WritableComputedRef<T>

export const useObservableLocalStorage: Type = (...params) => {
  const key = params[0]
  const item = useLocalStorage(...params)
  const getType = (val: any): AcceptableType => {
    const type = typeof val
    return (Object.keys(StorageSerializers).find((x) => x === type) ?? 'object') as AcceptableType
  }
  return computed({
    get: () => item.value,
    set: (newVal) => {
      const serializer = StorageSerializers[getType(newVal)] ?? JSON.stringify
      const newValue = serializer.write(newVal)
      const event = new StorageEvent('storage', { key, newValue })
      window.dispatchEvent(event)
    },
  })
}
