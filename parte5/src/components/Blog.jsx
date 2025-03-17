import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLike, eliminateBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const removeBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      eliminateBlog(blog)
      const response = await blogService.eliminate(blog.id)
      console.log(response)
    }
  }
  console.log('user.id:', user.id, typeof user.id)
  console.log('blog.user:', blog.user, typeof blog.user)
  console.log('blog.user.id:', blog.user?.id, typeof blog.user?.id)
  console.log('Comparación:', user.id === blog.user?.id)

  return (
    <div style={blogStyle} className='blog'>
      <div style={{ display: 'flex' }}>
        {blog.title} {blog.author}
      </div>
      <button onClick={() => setVisible(!visible)}> {visible ? 'hide' : 'show' } </button>

      {visible === true ?
        <div style={showWhenVisible}>
          <div className='url'>{blog.url}</div>
          <div className='likes'>likes {blog.likes} <button onClick={() => updateLike(blog)}>like</button></div>
          <div>{blog.user.name}</div>
          {user.id === (blog.user.id || blog.user) ? <div><button onClick={() => removeBlog()}>remove</button></div> : null}
        </div>
        :
        <>
        </>
      }
    </div>
  )
}

export default Blog