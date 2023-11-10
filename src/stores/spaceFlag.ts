import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpaceFlag = defineStore('spaceFlag', () => {
  const current = ref<number | null>(null)

  function setFlag(idx: number | null) {
    current.value = idx
  }

  return { current, setFlag }
})
