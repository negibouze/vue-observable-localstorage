import { computed } from 'vue'
import type { ComputedRef, WritableComputedRef } from 'vue'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import type { MaybeRef, StorageOptions } from '@vueuse/core'

type AcceptableType = keyof typeof StorageSerializers
type AvailableKeys = 'my-object2'

export type Type = <T>({
  key,
  initialValue,
  options,
  readOnly,
}: {
  key: AvailableKeys
  initialValue: MaybeRef<T>
  options?: StorageOptions<T>
  readOnly?: boolean
}) => ComputedRef<T> | WritableComputedRef<T>

export const useObservableLocalStorage: Type = (params) => {
  const { key, initialValue, options: opts, readOnly = false } = params
  const options = readOnly
    ? {
        ...opts,
        eventFilter: () => {
          /* watch の callback を発火させないために何もしない */
        },
        writeDefaults: false,
      }
    : opts
  const item = useLocalStorage(key, initialValue, options)
  const getType = (val: any): AcceptableType => {
    const type = typeof val
    return (Object.keys(StorageSerializers).find((x) => x === type) ?? 'object') as AcceptableType
  }
  return readOnly
    ? computed(() => item.value)
    : computed({
        get: () => item.value,
        set: (newVal) => {
          const serializer = StorageSerializers[getType(newVal)].write ?? JSON.stringify
          const newValue = serializer(newVal)
          const event = new StorageEvent('storage', { key, newValue })
          window.dispatchEvent(event)
        },
      })
}
