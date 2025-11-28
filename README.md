# Boilerplate UI Kit

A modern Vue 3 + Vuetify 3 component library built with TypeScript, Composition API, and Vite.

## Features

- 🎨 **Vuetify 3** based components
- 📦 **Tree-shakeable** - import only what you need
- 🎯 **TypeScript** support with full type definitions
- ⚡ **Vite** powered for fast builds
- 📚 **Storybook** for component documentation
- 🎨 **Customizable** theme colors and defaults

## Installation

### From GitHub

```bash
# Using yarn
yarn add https://github.com/west-dp/boilerplate-ui-kit.git

# Using npm
npm install https://github.com/west-dp/boilerplate-ui-kit.git

# Using pnpm
pnpm add https://github.com/west-dp/boilerplate-ui-kit.git
```

### From npm (when published)

```bash
yarn add boilerplate-ui-kit
# or
npm install boilerplate-ui-kit
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
yarn add vue@^3.3.0 vuetify@^3.5.0 vue-router@^4.5.0 mitt@^3.0.0
```

## Quick Start

### 1. Install the plugin

```typescript
// main.ts
import { createApp } from 'vue'
import { createBoilerplateVuetifyPlugin } from 'boilerplate-ui-kit/plugin'
import 'boilerplate-ui-kit/styles'

const app = createApp(App)

// Use with custom colors
const vuetify = createBoilerplateVuetifyPlugin({
  primary: '#9C27B0',
  secondary: '#FF9800',
  success: '#00BCD4',
  error: '#F44336',
  warning: '#FFC107'
})

app.use(vuetify)
app.mount('#app')
```

### 2. Import components

#### Tree-shakeable imports (recommended)

```vue
<script setup lang="ts">
// Import individual components
import { Table } from 'boilerplate-ui-kit/Table'
import { ConfirmDialog } from 'boilerplate-ui-kit/ConfirmDialog'
import { BaseButton } from 'boilerplate-ui-kit/BaseButton'
</script>
```

#### Or import from components entry point

```vue
<script setup lang="ts">
// Import from components entry point
import { Table, ConfirmDialog, BaseButton } from 'boilerplate-ui-kit/components'
</script>
```

### 3. Use components

```vue
<template>
  <div>
    <BaseButton 
      color="primary" 
      @clicked="handleClick"
    >
      Click me
    </BaseButton>
    
    <Table
      :headers="headers"
      :items="items"
      :loading="loading"
      @update:options="handleTableUpdate"
    />
    
    <ConfirmDialog />
  </div>
</template>
```

## Available Components

- **BaseButton** - Enhanced button component with loading, disabled states, and tooltips
- **BaseTextField** - Text input with debounced search, auto-focus, and validation
- **Table** - Server-side data table with pagination, sorting, and column settings
- **ConfirmDialog** - Global confirmation dialog using EventBus
- **PasswordControl** - Password input with visibility toggle
- **Badge** - Status badge component
- **ButtonIcon** - Icon button component
- **SidebarContainer** - Collapsible sidebar navigation

## Component Examples

### Table Component

```vue
<template>
  <Table
    :headers="headers"
    :items="items"
    :loading="loading"
    :total-items="totalItems"
    :filter="filter"
    @update:options="handleUpdate"
  >
    <template #item.status="{ item }">
      <Badge :status="item.status" />
    </template>
  </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table, Badge } from 'boilerplate-ui-kit/components'
import type { TableHeader } from 'boilerplate-ui-kit/Table'

const headers: TableHeader[] = [
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Status', key: 'status', sortable: false }
]

const items = ref([...])
const loading = ref(false)
const totalItems = ref(100)
const filter = ref({ page: 1, itemsPerPage: 10 })

const handleUpdate = (options) => {
  // Handle pagination, sorting, etc.
}
</script>
```

### ConfirmDialog with EventBus

```vue
<template>
  <div>
    <BaseButton @clicked="showConfirm">Delete Item</BaseButton>
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { BaseButton, ConfirmDialog } from 'boilerplate-ui-kit/components'
import EventBus from 'boilerplate-ui-kit/plugin/event-bus'

const showConfirm = () => {
  EventBus.emit('globalConfirmShow', {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this item?'
  })
}

const handleAnswer = (answer: boolean) => {
  if (answer) {
    // User confirmed
  }
}

onMounted(() => {
  EventBus.on('globalConfirmAnswer', handleAnswer)
})

onBeforeUnmount(() => {
  EventBus.off('globalConfirmAnswer', handleAnswer)
})
</script>
```

## Custom Styles

Import custom SCSS variables:

```scss
// In your main.scss or component
@import 'boilerplate-ui-kit/styles/variables.scss';
@import 'boilerplate-ui-kit/styles/kit-reset.scss';
```

Or import compiled CSS:

```typescript
import 'boilerplate-ui-kit/styles/variables'
import 'boilerplate-ui-kit/styles/kit-reset'
```

## Development

```bash
# Install dependencies
yarn install

# Run Storybook
yarn storybook

# Build library
yarn build

# Type check
yarn type-check

# Generate new component
yarn gen
```

## Project Structure

```
src/
├── components/          # Component library
│   ├── BaseButton/
│   ├── BaseTextField/
│   ├── Table/
│   └── ...
├── plugins/            # Vuetify plugin and utilities
├── styles/             # Global styles and variables
├── constants/          # Constants (colors, etc.)
├── models/             # TypeScript interfaces
├── utils/              # Utility functions
└── composables/        # Vue composables
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
