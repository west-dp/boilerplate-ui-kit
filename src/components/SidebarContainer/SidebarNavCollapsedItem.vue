<template>
  <template v-if="hasChildren">
    <v-menu
      open-on-hover
      :offset="[-35, -70]"
    >
      <template v-slot:activator="{ props: menuProps }">
        <div
          class="menu-item"
          v-bind="menuProps"
          :class="{ active: item.active }"
        >
          <v-icon class="menu-item-icon" :icon="item.icon"/>
        </div>
      </template>

      <ul class="menu-collapsed bg-primary">
        <router-link
          v-for="subMenu in item.items"
          :key="subMenu.id"
          active-class="active"
          exact-active-class="active"
          class="menu-collapsed-item"
          :class="{ active: subMenu.active }"
          :to="subMenu.url || '#'"
        >
          {{ subMenu.title }}
        </router-link>
      </ul>
    </v-menu>
  </template>
  <router-link
    v-else
    class="menu-item"
    :class="{ active: item.active }"
    v-tooltip="item.title"
    :key="item.id"
    :to="item.url || '#'"
  >
    <v-icon class="menu-item-icon" :icon="item.icon"/>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Navigation } from '../../models/nav'

interface Props {
  item: Navigation
  collapsed?: boolean
}

const props = defineProps<Props>()

const hasChildren = computed(() => (props.item.items?.length || 0) > 0)
</script>

<style scoped lang="scss">
@import './sidebar-menu.scss';

.menu-collapsed {
  font-size: 14px;
  padding: 8px;
  border-radius: 8px;
  min-width: 180px;

  &-item {
    cursor: pointer;
    color: white;
    display: block;
    text-decoration: none;
    margin-bottom: 8px;
    padding: 8px;

    &.active,
    &:hover {
      font-weight: 700;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

