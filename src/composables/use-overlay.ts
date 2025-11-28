import { ref } from 'vue'

export function useOverlay() {
  const overlay = ref(false)

  const toggleOverlay = () => {
    overlay.value = !overlay.value
  }

  return {
    overlay,
    toggleOverlay
  }
}

