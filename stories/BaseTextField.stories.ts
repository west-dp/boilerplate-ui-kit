import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseTextField from '../src/components/BaseTextField/BaseTextField.vue'

const meta: Meta<typeof BaseTextField> = {
  title: 'Components/BaseTextField',
  component: BaseTextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'underlined', 'solo', 'solo-inverted', 'solo-filled', 'plain']
    },
    density: {
      control: 'select',
      options: ['default', 'comfortable', 'compact']
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url']
    }
  }
}

export default meta
type Story = StoryObj<typeof BaseTextField>

export const Default: Story = {
  args: {
    label: 'Default Text Field',
    placeholder: 'Enter text here',
    variant: 'outlined',
    density: 'comfortable'
  },
  render: (args) => ({
    components: { BaseTextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<BaseTextField v-model="value" v-bind="args" />'
  })
}

export const WithValue: Story = {
  args: {
    label: 'Text Field with Value',
    placeholder: 'Enter text here',
    variant: 'outlined',
    density: 'comfortable',
    modelValue: 'Initial value'
  },
  render: (args) => ({
    components: { BaseTextField },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value }
    },
    template: '<BaseTextField v-model="value" v-bind="args" />'
  })
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Text Field',
    placeholder: 'Cannot edit',
    variant: 'outlined',
    density: 'comfortable',
    disabled: true,
    modelValue: 'Disabled value'
  },
  render: (args) => ({
    components: { BaseTextField },
    setup() {
      const value = ref(args.modelValue || '')
      return { args, value }
    },
    template: '<BaseTextField v-model="value" v-bind="args" />'
  })
}

export const ErrorState: Story = {
  args: {
    label: 'Text Field with Error',
    placeholder: 'Enter text here',
    variant: 'outlined',
    density: 'comfortable',
    error: true,
    errorMessages: 'This field is required'
  },
  render: (args) => ({
    components: { BaseTextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<BaseTextField v-model="value" v-bind="args" />'
  })
}

export const WithIcon: Story = {
  args: {
    label: 'Text Field with Icon',
    placeholder: 'Search...',
    variant: 'outlined',
    density: 'comfortable',
    prependIcon: 'mdi-magnify',
    clearable: true
  },
  render: (args) => ({
    components: { BaseTextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<BaseTextField v-model="value" v-bind="args" />'
  })
}

export const AutoFocus: Story = {
  args: {
    label: 'Auto Focus Text Field',
    placeholder: 'This field will be focused',
    variant: 'outlined',
    density: 'comfortable',
    autoFocus: true
  },
  render: (args) => ({
    components: { BaseTextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<BaseTextField v-model="value" v-bind="args" />'
  })
}

