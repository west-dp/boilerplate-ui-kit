<template>
  <div class="table-footer action-container">
    <span class="table-footer_text">Rows per page:</span>
    <v-select
      class="table-footer-per-page"
      variant="underlined"
      v-model="filter.itemsPerPage"
      :items="[10, 25, 50, 100]"
      hide-details
      @update:model-value="onItemsPerPageChange"
    />
    <span
      v-if="totalItems"
      class="table-footer_text"
    >
      {{ countPage }}
    </span>
    <v-icon
      class="table-footer-icon"
      v-ripple
      :disabled="filter.page === 1 || loading"
      @click="onFirst"
    >
      mdi-page-first
    </v-icon>
    <v-icon
      class="table-footer-icon"
      v-ripple
      :disabled="filter.page === 1 || loading"
      @click="onPrev"
    >
      mdi-chevron-left
    </v-icon>
    <v-icon
      class="table-footer-icon"
      v-ripple
      :disabled="loading || isLastPage || hideNextPage"
      @click="onNext"
    >
      mdi-chevron-right
    </v-icon>
    <v-icon
      v-if="totalItems"
      class="table-footer-icon"
      v-ripple
      :disabled="loading || isLastPage || hideNextPage"
      @click="onLast"
    >
      mdi-page-last
    </v-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TableFooterProps, DefaultTableFilter } from '../../models/table'

interface Props extends TableFooterProps {
  totalItems: number
  hideNextPage: boolean
  loading: boolean
  filter: DefaultTableFilter
}

const props = defineProps<Props>()

const onFirst = () => {
  props.filter.page = 1
}

const onPrev = () => {
  props.filter.page -= 1
}

const onNext = () => {
  props.filter.page += 1
}

const onLast = () => {
  props.filter.page = Math.ceil(props.totalItems / props.filter.itemsPerPage)
}

const isLastPage = computed(() => 
  props.filter.page === Math.ceil(props.totalItems / props.filter.itemsPerPage)
)

const countPage = computed(() => {
  const itemsPerPage = props.filter.itemsPerPage
  const page = props.filter.page
  const totalItems = props.totalItems

  if (totalItems <= itemsPerPage) {
    return `${totalItems} of ${totalItems}`
  }

  const start = (page - 1) * itemsPerPage + 1
  const end = Math.min(page * itemsPerPage, totalItems)

  return `${start}-${end} of ${totalItems}`
})

const onItemsPerPageChange = (value: number) => {
  props.filter.itemsPerPage = value
  props.filter.page = 1
}
</script>

<style scoped lang="scss">
.table-footer {
  padding: 8px 4px;
  font-size: 12px;

  &-action {
    width: 20px;
    height: 20px !important;
  }

  &-icon {
    font-size: 24px;
    color: var(--ui-label-color, #666);
    border-radius: 50%;
  }

  &_text {
    color: var(--ui-disabled-color, #999);
  }

  &-per-page {
    max-width: 60px;

    :deep(.v-select__selection-text) {
      font-size: 12px;
    }

    :deep(.v-field__input) {
      padding: 5px !important;
    }

    :deep(.v-field__outline) {
      display: none;
    }
  }
}
</style>

