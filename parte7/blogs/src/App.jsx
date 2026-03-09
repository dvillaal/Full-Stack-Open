import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setUserFromLocalStorage } from './reducers/userReducer.js'
import { createBlog } from './reducers/blogReducer.js'
import Menu from './components/Menu.jsx'
import { Route, Routes, useMatch } from 'react-router'
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import userService from './services/users.js'
import blogService from './services/blogs.js'
import BlogDescription from './components/BlogDescription.jsx'
import { Container, Row, Col, Card } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const [classNotification, setClassNotification] = useState('')
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(setUserFromLocalStorage())
  }, [dispatch])

  useEffect(() => {
    userService
      .getAll()
      .then(users => {
        setUsers(users)
      })
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  const handleLogin = async (userToLogin) => {

    try {
      dispatch(loginUser(userToLogin))
    } catch {
      setClassNotification('error-notification')
      dispatch(setNotification('Wrong username or password', 5000))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      dispatch(createBlog(blogObject))
      setClassNotification('successful-notification')
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5000))
    } catch (error) {
      setClassNotification('error-notification')
      dispatch(setNotification(`${error.response.data.error}`), 5000)
    }
  }

  const userMatch = useMatch('users/:id')
  const userToSee = userMatch
    ? users.find(a => a.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('blogs/:id')
  const blogToSee = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    // Contenedor principal con espaciado
    <Container className='my-4'>
      {user === null ?
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-sm">
              <h1 className="h4 mb-3">log in to application</h1>

              <Notification classNotification={classNotification}/>

              <LoginForm createLogin={handleLogin}/>
            </Card>
          </Col>
        </Row>
        :
        <div>
          <Menu />

          <Notification
            classNotification={classNotification}
          />

          <Routes>
            <Route path='/' element={
              <div>
                <div>
                  <Togglable buttonLabel='new note' ref={blogFormRef}>
                    <h2>create new</h2>
                    <BlogForm createBlog={addBlog}/>
                  </Togglable>
                </div>

                <div data-testid='blogs'>
                  <BlogList />
                </div>
              </div>
            }
            />
            <Route
              path='/blogs/:id'
              element={<BlogDescription blog={blogToSee}/>} />
            <Route path='/users' element={<Users users={users} />} />
            <Route
              path='/users/:id'
              element={<User user={userToSee}/>} />
          </Routes>
        </div>
      }
    </Container>
  )
}

export default App