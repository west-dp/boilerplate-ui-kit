import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { ThemeOptions } from './types'

export function createBoilerplateVuetifyPlugin(options: ThemeOptions = {}) {
  const {
    primary = '#1976D2',
    secondary = '#424242',
    success = '#4CAF50',
    error = '#FF5252',
    warning = '#FB8C00'
  } = options

  return createVuetify({
    components,
    directives,
    defaults: {
      VBtn: {
        color: 'primary',
        variant: 'flat',
        rounded: false,
        elevation: 0
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VTextarea: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VCheckbox: {
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VRadio: {
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VSwitch: {
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VAutocomplete: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VCombobox: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VFileInput: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VDatePicker: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      },
      VTimePicker: {
        variant: 'outlined',
        density: 'comfortable',
        hideDetails: 'auto'
      }
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary,
            secondary,
            success,
            error,
            warning
          }
        }
      }
    }
  })
}

