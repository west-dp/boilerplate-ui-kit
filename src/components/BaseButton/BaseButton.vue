<template>
  <v-tooltip
    v-if="iconOnly && tooltip"
    :text="tooltip"
    location="top"
  >
    <template #activator="{ props: tooltipProps }">
      <v-btn
        v-bind="tooltipProps"
        :color="color"
        :variant="variant"
        :size="size"
        :disabled="isDisabled"
        :loading="loading"
        :prepend-icon="!iconOnly && icon ? icon : undefined"
        :append-icon="!iconOnly && appendIcon ? appendIcon : undefined"
        :icon="iconOnly ? icon : undefined"
        :rounded="rounded"
        :elevation="elevation"
        :class="buttonClass"
        @click="handleClick"
      >
        <template v-if="!iconOnly">
          <slot>{{ text }}</slot>
        </template>
      </v-btn>
    </template>
  </v-tooltip>
  <v-btn
    v-else
    :color="color"
    :variant="variant"
    :size="size"
    :disabled="isDisabled"
    :loading="loading"
    :prepend-icon="!iconOnly && icon ? icon : undefined"
    :append-icon="!iconOnly && appendIcon ? appendIcon : undefined"
    :icon="iconOnly ? icon : undefined"
    :rounded="rounded"
    :elevation="elevation"
    :class="buttonClass"
    @click="handleClick"
  >
    <template v-if="!iconOnly">
      <slot>{{ text }}</slot>
    </template>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VuetifyColor } from '../../constants/color'

interface Props {
  color?: VuetifyColor | string
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  text?: string
  icon?: string
  appendIcon?: string
  iconOnly?: boolean
  tooltip?: string
  loading?: boolean
  disabled?: boolean
  rounded?: boolean | string | number
  elevation?: number | string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'flat',
  size: 'default',
  iconOnly: false,
  loading: false,
  disabled: false,
  rounded: false,
  elevation: 0
})

const emit = defineEmits<{
  clicked: []
}>()

const buttonClass = computed(() => props.class)

const isDisabled = computed(() => props.disabled || props.loading)

const handleClick = () => {
  if (!isDisabled.value) {
    emit('clicked')
  }
}
</script>

