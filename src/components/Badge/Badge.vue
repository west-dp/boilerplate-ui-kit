<template>
  <div
    class="badge"
    :class="status"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import type { BadgeProps } from './badge.types'

interface Props extends BadgeProps {
  label: string
  status?: 'success' | 'error' | 'info' | 'default'
}

withDefaults(defineProps<Props>(), {
  status: 'default'
})
</script>

<style scoped lang="scss">
@import './badge.scss';
</style>

