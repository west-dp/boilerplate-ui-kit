<template>
  <v-text-field
    ref="searchRef"
    v-model="inputValue"
    :label="label"
    :placeholder="placeholder"
    :variant="variant"
    :density="density"
    :disabled="disabled"
    :readonly="readonly"
    :error="error"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :clearable="clearable"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :type="type"
    :rules="rules"
    :class="fieldClass"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  variant?: 'filled' | 'outlined' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
  density?: 'default' | 'comfortable' | 'compact'
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessages?: string | string[]
  hideDetails?: boolean | 'auto'
  clearable?: boolean
  prependIcon?: string
  appendIcon?: string
  type?: string
  rules?: Array<(value: any) => boolean | string>
  timeout?: number
  autoFocus?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outlined',
  density: 'comfortable',
  disabled: false,
  readonly: false,
  error: false,
  hideDetails: 'auto',
  clearable: false,
  timeout: 300,
  autoFocus: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
  search: [value: string | number | undefined]
  blur: []
}>()

const searchRef = ref<any>(null)
const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const fieldClass = computed(() => props.class)

// Handle v-model using computed property with get and set
const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string | number | undefined) => {
    emit('update:modelValue', value)
    
    // Clear existing timer using reactive ref
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
      debounceTimer.value = null
    }
    
    // Set new timer for debounced search
    debounceTimer.value = setTimeout(() => {
      emit('search', value)
      debounceTimer.value = null
    }, props.timeout)
  }
})

const handleBlur = () => {
  emit('blur')
}

const focusInput = async () => {
  if (!searchRef.value) return
  
  await nextTick()
  
  // Use Vuetify's focus method if available, otherwise fallback to DOM
  if (typeof searchRef.value.focus === 'function') {
    searchRef.value.focus()
  } else {
    const input = searchRef.value.$el?.querySelector('input') as HTMLInputElement | null
    if (input) {
      input.focus()
    }
  }
}

onMounted(() => {
  if (props.autoFocus) {
    focusInput()
  }
})

// Cleanup timer on unmount
onBeforeUnmount(() => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = null
  }
})

// Watch for modelValue changes to cleanup timer if component is unmounted during debounce
watch(() => props.modelValue, () => {
  // Timer cleanup is handled in the setter
}, { immediate: false })
</script>

