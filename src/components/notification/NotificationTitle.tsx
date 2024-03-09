import React from 'react'
import { AlertTitle } from '@mui/material'

import getNotificationTitle from './utils'
import { NotificationTitleProps } from './types'

const NotificationTitle = ({ status, title }: NotificationTitleProps) => (
  <AlertTitle>{getNotificationTitle({ status, title })}</AlertTitle>
)

export default NotificationTitle
