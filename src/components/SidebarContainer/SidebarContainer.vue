<template>
  <v-navigation-drawer
    class="sidebar"
    color="primary"
    :width="width"
    permanent
  >
    <template v-slot:prepend>
      <div class="sidebar-header">
        <a
          class="sidebar-title cursor-pointer"
        >
          {{ title }}
        </a>

        <v-icon
          @click="handleToggleCollapse"
        >
          {{ icon }}
        </v-icon>
      </div>
    </template>
    <nav class="sidebar-container">
      <component
        v-for="item in navItems"
        :is="navItemComponent"
        :collapsed="collapsed"
        :item="item"
        :key="item.id"
      />
    </nav>
    <template v-slot:append>
      <slot name="append">
        <!-- Footer slot -->
      </slot>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, markRaw } from 'vue'
import type { Navigation } from '../../models/nav'
import SidebarNavCollapsedItem from './SidebarNavCollapsedItem.vue'
import SidebarNavItem from './SidebarNavItem.vue'

interface Props {
  navItems: Navigation[]
  title?: string
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Sidebar',
  collapsed: false
})

const emit = defineEmits<{
  collapsed: []
}>()

const title = computed(() => props.collapsed ? props.title.charAt(0) : props.title)
const icon = computed(() => props.collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left')
const width = computed(() => props.collapsed ? 88 : 260)
const navItemComponent = computed(() => 
  props.collapsed ? markRaw(SidebarNavCollapsedItem) : markRaw(SidebarNavItem)
)

const handleToggleCollapse = () => {
  emit('collapsed')
}
</script>

<style scoped lang="scss">
@import './sidebar-container.scss';
</style>

