import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    window.localStorage.setItem('token', JSON.stringify(user.token))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('token')
    blogService.setToken(null)
    dispatch(removeUser())
  }
}

export const setUserFromLocalStorage = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default userSlice.reducer
