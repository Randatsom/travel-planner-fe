import { AxiosError } from 'axios'
import { store } from 'core/store'
import { addNotification } from 'core/slices/notification/notificationSlice'
import { NotificationStatus } from 'core/slices/notification/types'

const dispatchError = (error: AxiosError<Error>) => {
  const text = error.response ? error.response.data.message : error.message

  if (!text) {
    return
  }

  store.dispatch(
    addNotification({
      text,
      status: NotificationStatus.Error,
    })
  )
}

export default dispatchError
