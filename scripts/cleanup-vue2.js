#!/usr/bin/env node

import { readdirSync, unlinkSync, statSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = join(__dirname, '..', 'dist')

function removeVue2Files(dir) {
  if (!existsSync(dir)) return

  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      removeVue2Files(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.vue2.js')) {
      unlinkSync(fullPath)
      console.log(`Removed: ${fullPath.replace(distDir, 'dist')}`)
    }
  }
}

console.log('Cleaning up .vue2.js files...')
removeVue2Files(distDir)
console.log('✅ Cleanup complete')

