<template>
  <div class="{{kebabCase name}}">
    <!-- Component content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { {{pascalCase name}}Props } from './{{kebabCase name}}.types'

interface Props extends {{pascalCase name}}Props {
  // Add component props here
}

const props = withDefaults(defineProps<Props>(), {
  // Default props
})

const emit = defineEmits<{
  // Add events here
}>()

// Component logic
</script>

<style scoped lang="scss">
.{{kebabCase name}} {
  // Component styles
}
</style>

