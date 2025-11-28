<template>
  <section>
    <v-btn
      color="primary"
      prepend-icon="mdi-cog-outline"
      @click="toggleOverlay"
    >
      Columns settings
    </v-btn>
    <v-overlay
      v-model="overlay"
      class="table-overlay"
    >
      <div
        class="table-menu box-shadow"
        @click:outside="toggleOverlay"
      >
        <p class="table-menu-title">Column settings</p>
        <div class="table-menu-content">
          <v-checkbox
            class="select-all-line"
            v-model="allCheckboxValue"
            label="Select all"
            hide-details
            color="blue"
            :indeterminate="isIndeterminateAllCheckbox"
            @change="onSelectAll"
          />
          <v-checkbox
            v-for="column in columns"
            :key="column.key"
            v-model="column.selected"
            :label="column.title"
            class="select-line"
            hide-details
            color="blue"
            @update:model-value="onUpdateColumnSelect"
          />
        </div>
        <v-btn
          class="full-width"
          color="primary"
          @click="onApplyChanges"
        >
          Apply changes
        </v-btn>
      </div>
    </v-overlay>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableHeader, TableSettingColumnsProps } from '../../models/table'
import { TokenUtils } from '../../utils/token.utils'
import { useOverlay } from '../../composables'

interface Props extends TableSettingColumnsProps {
  id?: string
  headers: TableHeader[]
}

const props = withDefaults(defineProps<Props>(), {
  id: () => TokenUtils.generate()
})

const emit = defineEmits<{
  updated: [headers: TableHeader[]]
}>()

const { overlay, toggleOverlay } = useOverlay()
const allCheckboxValue = ref<boolean>(false)

const getColumns = (): TableHeader[] => {
  return props.headers.map((header: TableHeader) => ({
    ...header,
    selected: true
  }))
}

const columns = ref<TableHeader[]>(getColumns())

const isIndeterminateAllCheckbox = computed(() => {
  const isSomeSelected = columns.value.some(({ selected }) => selected)
  return isSomeSelected && !allCheckboxValue.value
})

const onApplyChanges = () => {
  const selectedColumns: TableHeader[] = columns.value.filter(({ selected }) => selected)

  if (selectedColumns.length) {
    overlay.value = false
    emit('updated', selectedColumns)
    return
  } else {
    alert('Please select at least one column')
  }
}

const onSelectAll = () => {
  columns.value.forEach((column: TableHeader) => {
    column.selected = allCheckboxValue.value
  })
}

const onUpdateColumnSelect = () => {
  allCheckboxValue.value = columns.value.every(({ selected }) => selected)
}
</script>

<style scoped lang="scss">
.table-overlay {
  :deep(.v-overlay__content) {
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    width: 400px;
    height: 100%;
  }
}

.table-menu {
  background-color: white;
  height: 100%;
  padding: 56px 24px 0;
  overflow-y: auto;

  &-title {
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-content {
    padding-top: 32px;
    padding-bottom: 40px;
  }
}

.select-all-line,
.select-line {
  margin-bottom: 24px;
}

.full-width {
  width: 100%;
}
</style>

