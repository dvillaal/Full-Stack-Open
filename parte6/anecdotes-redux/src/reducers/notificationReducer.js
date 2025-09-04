import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    configureNotification(state, action) {
      return action.payload
    },
    eliminateNotification() {
      return ''
    }
  }
})

export const { configureNotification, eliminateNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch(configureNotification(notification))
    setTimeout(() => {
      dispatch(eliminateNotification())
    }, time)
  }
}

export default notificationSlice.reducer