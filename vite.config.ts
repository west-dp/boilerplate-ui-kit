import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { readdirSync, existsSync } from 'fs'

// Dynamically discover components
function findComponents() {
  const componentsDir = resolve(__dirname, 'src/components')
  const components = []
  
  if (!existsSync(componentsDir)) return components
  
  const entries = readdirSync(componentsDir, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexFile = resolve(componentsDir, entry.name, 'index.ts')
      if (existsSync(indexFile)) {
        components.push(entry.name)
      }
    }
  }
  
  return components.sort()
}

// Generate entry points dynamically
function generateEntries() {
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
    'components/index': resolve(__dirname, 'src/components/index.ts'),
    'plugins/vuetify': resolve(__dirname, 'src/plugins/vuetify.ts'),
    'constants/color': resolve(__dirname, 'src/constants/color.ts'),
    'styles/index': resolve(__dirname, 'src/styles/index.ts')
  }
  
  return entries
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts'],
      copyDtsFiles: true
    })
  ],
  build: {
    lib: {
      entry: generateEntries(),
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: (id) => {
        // Externalize dependencies
        if (id === 'vue' || id === 'vuetify' || id === '@mdi/font' || id === 'vue-router' || id === 'mitt') {
          return true
        }
        // Externalize Vue runtime helpers
        if (id.startsWith('vue/') || id.startsWith('@vue/')) {
          return true
        }
        // Externalize Vuetify submodules
        if (id.startsWith('vuetify/')) {
          return true
        }
        return false
      },
      output: {
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return 'styles/[name][extname]'
        },
        entryFileNames: '[name].js',
        // Filter out vue2.js files from chunk names
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name?.endsWith('.vue2')) {
            return chunkInfo.name.replace('.vue2', '.vue') + '.js'
          }
          return '[name].js'
        }
      }
    },
    cssCodeSplit: true,
    // Don't emit vue2.js files
    minify: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})

