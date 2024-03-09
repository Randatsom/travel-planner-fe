import { NotificationStatus } from 'core/slices/notification/types'

export type NotificationTextProps = {
  content: string | string[]
}

export type NotificationTitleProps = {
  status: NotificationStatus
  title: string
}
