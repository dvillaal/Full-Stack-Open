import Blog from './Blog.jsx'
import { useEffect } from 'react'
import { addLike, deleteBlog, initializeBlogs } from '../reducers/blogReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const removeBlog = id => {
    dispatch(deleteBlog(id))
  }

  return (
    <Container className="my-4" data-testid='blogs'>
      <h2 className="mb-4">Blogs</h2>
      <Row xs={1} sm={2} md={2} lg={3} className="g-4">
        {blogs
          .map(blog => (
            <Col key={blog.id} role="listitem">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title as="h3" className="h5">
                    <Blog
                      key={blog.id}
                      blog={blog}
                      eliminateBlog={() => removeBlog(blog.id)}
                    />
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
                  <Card.Text className="text-truncate" style={{ maxHeight: '4.5rem' }}>
                    {blog.url}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <div className="small text-muted">Likes: {blog.likes || 0}</div>
                  <div>
                    {/*<Button*/}
                    {/*  variant="primary"*/}
                    {/*  size="sm"*/}
                    {/*  className="me-2"*/}
                    {/*  aria-label={`Ver blog ${blog.title}`}*/}
                    {/*  as="a"*/}
                    {/*>*/}
                    {/*  <Link to={`/blogs/${blog.id}`}> Ver </Link>*/}
                    {/*</Button>*/}
                    <Button
                      variant="danger"
                      size="sm"
                      aria-label={`Eliminar blog ${blog.title}`}
                      onClick={() => removeBlog(blog.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  )
}

export default BlogList