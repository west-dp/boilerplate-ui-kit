<template>
  <v-btn
    v-if="text"
    :color="color"
    :disabled="disabled"
    :class="[additionalClass]"
    @click="handleClick"
  >
    <v-icon class="button-icon-icon">{{ icon }}</v-icon>
    {{ text }}
  </v-btn>
  <v-icon
    v-else-if="icon && !tooltip"
    class="button-icon"
    :class="[getBgClass(), additionalClass]"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ icon }}
  </v-icon>
  <span v-else class="cursor-pointer" v-tooltip="tooltip">
    <v-icon
      class="button-icon"
      :class="[getBgClass(), additionalClass]"
      :disabled="disabled"
      @click="handleClick"
    >
      {{ icon }}
    </v-icon>
  </span>
</template>

<script setup lang="ts">
import type { VuetifyColor } from '../../constants/color'
import type { ButtonIconProps } from './button-icon.types'

interface Props extends ButtonIconProps {
  color: VuetifyColor | string
  icon?: string
  text?: string
  disabled?: boolean
  tooltip?: string
  additionalClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  text: '',
  disabled: false,
  tooltip: '',
  additionalClass: ''
})

const emit = defineEmits<{
  clicked: []
}>()

const getBgClass = () => `bg-${props.color}`

const handleClick = () => {
  if (!props.disabled) {
    emit('clicked')
  }
}
</script>

<style scoped lang="scss">
@import './button-icon.scss';
</style>

