import type { VuetifyColor } from '../../constants/color'

export interface ButtonIconProps {
  icon?: string
  text?: string
  color: VuetifyColor | string
  disabled?: boolean
  tooltip?: string
  additionalClass?: string
}

