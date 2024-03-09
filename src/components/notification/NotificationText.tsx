import React from 'react'
import { Typography } from '@mui/material'
import { NotificationTextProps } from './types'

const NotificationText = ({ content }: NotificationTextProps) => {
  if (!content) {
    return null
  }

  return Array.isArray(content) ? (
    content.map((text) => <Typography key={text}>{text}</Typography>)
  ) : (
    <Typography>{content}</Typography>
  )
}

export default NotificationText
