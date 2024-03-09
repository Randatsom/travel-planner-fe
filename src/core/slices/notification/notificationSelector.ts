import { RootState } from 'core/types'

export const selectIsLoading = (state: RootState) =>
  state.notification.isLoading
