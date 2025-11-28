#!/usr/bin/env node

import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const componentsDir = join(rootDir, 'src/components')
const packageJsonPath = join(rootDir, 'package.json')

// Find all component directories
function findComponents(dir) {
  const components = []
  if (!existsSync(dir)) return components

  const entries = readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const componentPath = join(dir, entry.name)
      const indexFile = join(componentPath, 'index.ts')
      
      if (existsSync(indexFile)) {
        components.push(entry.name)
      }
    }
  }
  
  return components.sort()
}

// Read package.json
const packageJson = JSON.parse(
  readFileSync(packageJsonPath, 'utf-8')
)

// Update package.json exports
const components = findComponents(componentsDir)

// Get existing non-component exports
const existingExports = packageJson.exports || {}
const nonComponentExports = Object.fromEntries(
  Object.entries(existingExports).filter(([key]) => {
    // Keep main export, components, styles, plugin, constants, package.json
    return key === '.' || 
           key === './components' ||
           key.startsWith('./styles') || 
           key === './plugin' || 
           key === './constants' ||
           key === './package.json'
  })
)

// Build new exports object
packageJson.exports = {
  '.': existingExports['.'] || {
    import: './dist/index.js',
    types: './dist/index.d.ts'
  },
  './components': {
    import: './dist/components/index.js',
    types: './dist/components/index.d.ts'
  },
  ...nonComponentExports
}

// Write updated package.json
writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2) + '\n',
  'utf-8'
)

// Update src/index.ts
const indexPath = join(rootDir, 'src/index.ts')

function generateIndexExports(components) {
  const lines = [
    '// Auto-generated exports - run "yarn generate-exports" to update',
    '',
    '// Re-export all components from components entry point'
  ]
  
  lines.push("export * from './components'")
  lines.push('')
  lines.push('// Export plugin and types')
  lines.push("export { createBoilerplateVuetifyPlugin } from './plugins/vuetify'")
  lines.push("export type { ThemeOptions } from './plugins/types'")
  lines.push('')
  lines.push('// Export constants')
  lines.push("export { DEFAULT_COLORS, type VuetifyColor } from './constants/color'")
  lines.push('')
  
  return lines.join('\n')
}

// Update src/components/index.ts
const componentsIndexPath = join(rootDir, 'src/components/index.ts')

function generateComponentsIndex(components) {
  const lines = [
    '// Auto-generated exports - run "yarn generate-exports" to update',
    '// Export all components from a single entry point',
    ''
  ]
  
  for (const component of components) {
    lines.push(`export * from './${component}'`)
  }
  
  lines.push('')
  
  return lines.join('\n')
}

const indexContent = generateIndexExports(components)
writeFileSync(indexPath, indexContent, 'utf-8')

const componentsIndexContent = generateComponentsIndex(components)
writeFileSync(componentsIndexPath, componentsIndexContent, 'utf-8')

console.log(`✅ Generated exports for ${components.length} components:`)
components.forEach(comp => console.log(`   - ${comp}`))
console.log(`✅ Updated package.json exports`)
console.log(`✅ Updated src/index.ts`)
console.log(`✅ Updated src/components/index.ts`)

