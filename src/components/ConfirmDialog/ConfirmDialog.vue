<template>
  <v-dialog
    v-model="dialogData.show"
    width="500"
    @click:outside="handleAnswer(false)"
  >
    <section class="modal-container">
      <h3
        class="modal-title"
        data-e2e="global-dialog-confirm-title"
      >
        {{ dialogData.title }}
      </h3>

      <p
        class="modal-text"
        data-e2e="global-dialog-confirm-message"
      >
        {{ dialogData.message }}
      </p>

      <div class="modal-actions">
        <v-btn
          class="action-button modal-fixed-button"
          color="secondary"
          data-e2e="global-dialog-confirm-cancel-button"
          @click="handleAnswer(false)"
        >
          Cancel
        </v-btn>
        <v-btn
          class="action-button modal-fixed-button"
          color="primary"
          data-e2e="global-dialog-confirm-confirm-button"
          @click="handleAnswer(true)"
        >
          Confirm
        </v-btn>
      </div>
    </section>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import EventBus from '../../plugins/event-bus'
import type { ConfirmDialogData } from '../../models/buss-event'

const dialogData = reactive<{
  show: boolean
  message: string
  title: string
}>({
  show: false,
  message: '',
  title: 'Confirm action'
})

const listener = (data: ConfirmDialogData) => {
  dialogData.show = true
  dialogData.message = data.message
  dialogData.title = data.title || 'Confirm action'
}

onMounted(() => {
  EventBus.on('globalConfirmShow', listener)
})

onBeforeUnmount(() => {
  EventBus.off('globalConfirmShow', listener)
})

const handleAnswer = (answer: boolean) => {
  EventBus.emit('globalConfirmAnswer', answer)
  dialogData.show = false
}
</script>

<style scoped lang="scss">
@import './confirm-dialog.scss';
</style>

