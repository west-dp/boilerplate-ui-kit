export type BadgeLabelType = 'success' | 'error' | 'info' | 'default'

export interface BadgeProps {
  label: string
  status?: BadgeLabelType
}

