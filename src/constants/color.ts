/**
 * Color constants for the UI Kit
 * These can be extended or overridden via the Vuetify plugin options
 */
export const DEFAULT_COLORS = {
  primary: '#1976D2',
  secondary: '#424242',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FB8C00'
} as const

export type VuetifyColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'accent'

