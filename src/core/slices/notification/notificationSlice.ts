import { createSlice } from '@reduxjs/toolkit'
import { NotificationState } from './types'

const initialState: NotificationState = { messages: [], isLoading: false }

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      if (state.messages.some(({ text }) => text === action.payload.text)) {
        return
      }

      state.messages.push({
        ...action.payload,
        id: action.payload.id || Date.now(),
      })
    },
    removeNotification: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      )
    },
    removeAllNotifications: () => initialState,
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  addNotification,
  removeNotification,
  removeAllNotifications,
  setIsLoading,
} = notification.actions
export default notification.reducer
