<template>
  <template v-if="hasChildren">
    <div
      class="menu-item cursor-pointer"
      :class="{ active: item?.active }"
    >
      <v-icon
        class="menu-item-icon"
        :icon="item.icon"
      />
      {{ item.title }}
    </div>

    <ul class="menu-sub">
      <router-link
        v-for="subMenu in item.items"
        :key="subMenu.id"
        active-class="active"
        exact-active-class="active"
        class="menu-sub-item"
        :class="{ active: subMenu.active }"
        :to="subMenu.url || '#'"
      >
        {{ subMenu.title }}
      </router-link>
    </ul>
  </template>
  <router-link
    v-else
    class="menu-item cursor-pointer"
    :class="{ active: item.active }"
    :to="item.url || '#'"
  >
    <v-icon
      class="menu-item-icon"
      :icon="item.icon"
    />
    {{ item.title }}
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

const hasChildren = computed(() => props.item && (props.item.items?.length || 0) > 0)
</script>

<style scoped lang="scss">
@import './sidebar-menu.scss';
</style>

