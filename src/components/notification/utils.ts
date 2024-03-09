import { NotificationStatus } from 'core/slices/notification/types.js'
import { NotificationTitleProps } from './types'

const getNotificationTitle = ({ status, title }: NotificationTitleProps) => {
  const defaultText =
    status === NotificationStatus.Error ? 'Возникла ошибка' : 'Данные сохранены'

  if (title) {
    return title
  }

  return defaultText
}

export default getNotificationTitle
