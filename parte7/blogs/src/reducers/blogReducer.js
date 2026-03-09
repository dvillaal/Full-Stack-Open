import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addLike = (id, blogVoted) => {
  return async dispatch => {
    const blog = await blogService.update(id, blogVoted)
    dispatch(updateBlog(blog))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch(appendBlog(blog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.eliminate(id)
    dispatch(removeBlog({ id }))
  }
}

export const { setBlogs, updateBlog, appendBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer