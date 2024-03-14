import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openModalId: null,
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.openModalId = action.payload
    },
    closeModal: (state) => {
      state.openModalId = null
    },
  },
})

export const { openModal, closeModal } = modal.actions

export default modal.reducer
