import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createBoilerplateVuetifyPlugin } from '../src/plugins/vuetify'
import '../src/styles/kit-reset.scss'
import '../src/styles/variables.scss'

// Initialize Vuetify plugin with default colors
const vuetify = createBoilerplateVuetifyPlugin({
  primary: '#1976D2',
  secondary: '#424242',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FB8C00'
})

setup((app) => {
  app.use(vuetify)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'centered'
  },
  decorators: [
    (story) => {
      return {
        components: { story },
        template: '<v-app><story /></v-app>'
      }
    }
  ]
}

export default preview

