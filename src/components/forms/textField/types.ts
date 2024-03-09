import { Control, FieldValues } from 'react-hook-form'
import { TextFieldProps } from '@mui/material'

export type TextFieldControllerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: string
} & Omit<TextFieldProps, 'name' | 'variant'>
