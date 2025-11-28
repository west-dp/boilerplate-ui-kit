<template>
  <v-text-field
    v-model="passwordValue"
    :type="type"
    :error-messages="errorMessage"
    :append-inner-icon="icon"
    @click:append-inner="toggleShowPassword"
    autocomplete="on"
    data-e2e="password-field"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PasswordControlProps } from './password-control.types'

interface Props extends PasswordControlProps {
  modelValue?: string
  errorMessage?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  errorMessage: null
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const passwordValue = computed({
  get: () => props.modelValue?.toString() || '',
  set: (value: string) => {
    emit('update:modelValue', value?.length ? value.trim() : null)
  }
})

const showPassword = ref(false)
const type = computed(() => showPassword.value ? 'text' : 'password')
const icon = computed(() => showPassword.value ? 'mdi-eye' : 'mdi-eye-off')

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped lang="scss">
@import './password-control.scss';
</style>

