export interface BussEvent {
  globalConfirmShow: ConfirmDialogData
  globalConfirmAnswer: boolean
}

export interface ConfirmDialogData {
  title: string
  message: string
}

