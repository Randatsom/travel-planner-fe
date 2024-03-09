import React from 'react'
import { Alert } from '@mui/material'
import { AlertsSeverity } from 'core/enums'

const ShowAlert = ({
  severity,
  text,
}: {
  severity: AlertsSeverity
  text: string
}) => <Alert severity={AlertsSeverity[severity]}>{text}</Alert>

export default ShowAlert
