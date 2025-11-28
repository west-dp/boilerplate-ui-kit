import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '../src/components/BaseButton/BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'accent']
    },
    variant: {
      control: 'select',
      options: ['flat', 'text', 'elevated', 'tonal', 'outlined', 'plain']
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'default', 'large', 'x-large']
    }
  }
}

export default meta
type Story = StoryObj<typeof BaseButton>

export const Default: Story = {
  args: {
    text: 'Click Me',
    color: 'primary',
    variant: 'flat'
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" @clicked="() => console.log(\'Button clicked\')" />'
  })
}

export const Loading: Story = {
  args: {
    text: 'Loading...',
    color: 'primary',
    variant: 'flat',
    loading: true
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" />'
  })
}

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    color: 'primary',
    variant: 'flat',
    disabled: true
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" />'
  })
}

export const WithIcon: Story = {
  args: {
    text: 'With Icon',
    color: 'primary',
    variant: 'flat',
    icon: 'mdi-check'
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" />'
  })
}

export const IconOnly: Story = {
  args: {
    color: 'primary',
    variant: 'flat',
    icon: 'mdi-heart',
    iconOnly: true,
    tooltip: 'Like this'
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" />'
  })
}

export const Error: Story = {
  args: {
    text: 'Error Button',
    color: 'error',
    variant: 'flat'
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" />'
  })
}

export const Success: Story = {
  args: {
    text: 'Success Button',
    color: 'success',
    variant: 'flat'
  },
  render: (args: any) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args" />'
  })
}

