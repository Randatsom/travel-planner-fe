export enum NotificationStatus {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

type NotificationMessage = {
  id: number
  title: string
  text: string
  status: NotificationStatus
}

export type NotificationState = {
  messages: NotificationMessage[]
  isLoading: boolean
}
