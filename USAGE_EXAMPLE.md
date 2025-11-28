# How to Use boilerplate-ui-kit in Other Projects

## Installation

### From GitHub Repository

```bash
# Using yarn
yarn add https://github.com/west-dp/boilerplate-ui-kit.git

# Using npm
npm install https://github.com/west-dp/boilerplate-ui-kit.git

# Using pnpm
pnpm add https://github.com/west-dp/boilerplate-ui-kit.git
```

### Install Peer Dependencies

```bash
yarn add vue@^3.3.0 vuetify@^3.5.0 vue-router@^4.5.0 mitt@^3.0.0
```

## Setup

### 1. Initialize Vuetify Plugin

```typescript
// main.ts
import { createApp } from 'vue'
import { createBoilerplateVuetifyPlugin } from 'boilerplate-ui-kit/plugin'
import 'boilerplate-ui-kit/styles'
import App from './App.vue'

const app = createApp(App)

// Configure with custom colors
const vuetify = createBoilerplateVuetifyPlugin({
  primary: '#9C27B0',    // Purple
  secondary: '#FF9800',  // Orange
  success: '#00BCD4',    // Cyan
  error: '#F44336',      // Red
  warning: '#FFC107'     // Amber
})

app.use(vuetify)
app.mount('#app')
```

### 2. Import Components

#### Option A: Import from components entry (Recommended)

```vue
<script setup lang="ts">
import { Table, ConfirmDialog, BaseButton, BaseTextField } from 'boilerplate-ui-kit/components'
</script>
```

#### Option B: Import individual components (Better tree-shaking)

```vue
<script setup lang="ts">
import { Table } from 'boilerplate-ui-kit/Table'
import { ConfirmDialog } from 'boilerplate-ui-kit/ConfirmDialog'
import { BaseButton } from 'boilerplate-ui-kit/BaseButton'
</script>
```

## Complete Example

### main.ts

```typescript
import { createApp } from 'vue'
import { createBoilerplateVuetifyPlugin } from 'boilerplate-ui-kit/plugin'
import 'boilerplate-ui-kit/styles'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Custom color theme
const vuetify = createBoilerplateVuetifyPlugin({
  primary: '#1976D2',
  secondary: '#424242',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FB8C00'
})

app.use(vuetify)
app.use(router)
app.mount('#app')
```

### App.vue

```vue
<template>
  <v-app>
    <ConfirmDialog />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { ConfirmDialog } from 'boilerplate-ui-kit/components'
</script>
```

### Example Component (Home.vue)

```vue
<template>
  <div class="home">
    <h1>My App</h1>
    
    <!-- BaseButton -->
    <BaseButton
      text="Click Me"
      color="primary"
      @clicked="handleClick"
    />
    
    <!-- BaseTextField with debounced search -->
    <BaseTextField
      v-model="searchValue"
      label="Search"
      placeholder="Type to search..."
      @search="handleSearch"
    />
    
    <!-- Table Component -->
    <Table
      :headers="tableHeaders"
      :items="tableItems"
      :loading="loading"
      :total-items="totalItems"
      :filter="tableFilter"
      @update:options="handleTableUpdate"
    >
      <template #item.status="{ item }">
        <Badge :status="item.status" />
      </template>
      
      <template #item.actions="{ item }">
        <BaseButton
          text="Delete"
          color="error"
          size="small"
          @clicked="() => deleteItem(item.id)"
        />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { 
  Table, 
  ConfirmDialog, 
  BaseButton, 
  BaseTextField,
  Badge 
} from 'boilerplate-ui-kit/components'
import EventBus from 'boilerplate-ui-kit/plugin/event-bus'
import type { TableHeader, TableUpdateOptions } from 'boilerplate-ui-kit/Table'

// Table setup
const tableHeaders: TableHeader[] = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Status', key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
]

const tableItems = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
])

const loading = ref(false)
const totalItems = ref(2)
const tableFilter = ref({
  page: 1,
  itemsPerPage: 10,
  pagination: true
})

// Search
const searchValue = ref('')

const handleSearch = (value: string | number | undefined) => {
  console.log('Search:', value)
  // Implement search logic
}

// Table update handler
const handleTableUpdate = (options: TableUpdateOptions) => {
  console.log('Table update:', options)
  // Fetch new data based on options
}

// Delete with confirmation
const deleteItem = (id: number) => {
  EventBus.emit('globalConfirmShow', {
    title: 'Confirm Delete',
    message: `Are you sure you want to delete item ${id}?`
  })
}

const handleConfirmAnswer = (answer: boolean) => {
  if (answer) {
    console.log('User confirmed deletion')
    // Implement delete logic
  }
}

onMounted(() => {
  EventBus.on('globalConfirmAnswer', handleConfirmAnswer)
})

onBeforeUnmount(() => {
  EventBus.off('globalConfirmAnswer', handleConfirmAnswer)
})

const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

## Importing Types

```typescript
import type { 
  TableHeader, 
  TableProps, 
  TableUpdateOptions 
} from 'boilerplate-ui-kit/Table'

import type { ThemeOptions } from 'boilerplate-ui-kit/plugin'
import type { VuetifyColor } from 'boilerplate-ui-kit/constants'
```

## Importing Styles

### Option 1: Import compiled styles (Recommended)

```typescript
import 'boilerplate-ui-kit/styles'
```

### Option 2: Import SCSS files for customization

```scss
// In your main.scss or component
@import 'boilerplate-ui-kit/styles/variables.scss';
@import 'boilerplate-ui-kit/styles/kit-reset.scss';
```

## Using EventBus for ConfirmDialog

```typescript
import EventBus from 'boilerplate-ui-kit/plugin/event-bus'

// Show dialog
EventBus.emit('globalConfirmShow', {
  title: 'Confirm Action',
  message: 'Are you sure?'
})

// Listen for answer
EventBus.on('globalConfirmAnswer', (answer: boolean) => {
  if (answer) {
    // User confirmed
  }
})
```

## Vite Configuration

If you're using Vite, make sure your `vite.config.ts` handles the library correctly:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['boilerplate-ui-kit']
  }
})
```

## TypeScript Configuration

Make sure your `tsconfig.json` includes the library types:

```json
{
  "compilerOptions": {
    "types": ["vite/client"],
    "moduleResolution": "bundler"
  }
}
```

