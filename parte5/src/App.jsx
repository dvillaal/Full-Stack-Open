import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageNotification, setMessageNotification] = useState('')
  const [classNotification, setClassNotification] = useState('')


  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    const tokenJSON = window.localStorage.getItem('token')
    if (tokenJSON) {
      const token = JSON.parse(tokenJSON)
      blogService.setToken(token)
    }
  }, [])

  const handleLogin = async (userToLogin) => {

    try {
      const user = await loginService.login(userToLogin)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      window.localStorage.setItem('token', JSON.stringify(user.token))

      console.log(user)

      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setClassNotification('error-notification')
      setMessageNotification('Wrong username or password')
      setTimeout(() => {
        setMessageNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setClassNotification('successful-notification')
      setMessageNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessageNotification(null)
      }, 5000)

    } catch (error) {
      setClassNotification('error-notification')
      setMessageNotification(`${error.response.data.error}`)
      setTimeout(() => {
        setMessageNotification(null)
      }, 5000)
    }
  }

  const removeBlog = (blogObject) => {
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id ? blog : null))
  }

  const addLike = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject.id, {
      ...blogObject, likes: blogObject.likes + 1
    })
    setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
  }

  return (
    <div>
      {user === null ?
        <div>
          <h1>log in to application</h1>

          <Notification message={messageNotification} classNotification={classNotification}/>

          <LoginForm createLogin={handleLogin}/>
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification
            message={messageNotification}
            classNotification={classNotification}
          />

          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>

          <div>
            <Togglable buttonLabel='new note' ref={blogFormRef}>
              <h2>create new</h2>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
          </div>

          <div data-testid='blogs'>
            {blogs.sort((a,b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} updateLike={addLike} eliminateBlog={removeBlog} user={user}/>
              )}
          </div>
        </div>
      }
    </div>
  )
}

export default App