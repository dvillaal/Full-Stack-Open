import { useDispatch, useSelector } from 'react-redux'
import { addComment, addLike } from '../reducers/blogReducer.js'
import { useState } from 'react'
import { Container, Row, Col, Card, Button, Form, ListGroup, Badge } from 'react-bootstrap'

const BlogDescription = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => blogs )

  // Intentar obtener la versión más reciente del blog desde el store
  const blogToShow = blogs.find(b => b.id === blog.id) || blog

  const like = id => {
    const blogToLike = blogs.find(blog => blog.id === id)
    if (!blogToLike) return
    const likedBlog = { ...blogToLike, likes: (blogToLike.likes || 0) + 1 }
    dispatch(addLike(id, likedBlog))
  }

  const commentBlog = id => {
    const blogToComment = blogs.find(blog => blog.id === id)
    if (!blogToComment) return
    const commentedBlog = { ...blogToComment, comments: (blogToComment.comments || []).concat(comment) }
    dispatch(addComment(id, commentedBlog))
    setComment('')
  }

  if (!blogToShow) {
    return null
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title as="h2" className="mb-0">{blogToShow.title}</Card.Title>
                <Card.Subtitle className="text-muted">{blogToShow.author}</Card.Subtitle>
              </div>
              <Badge bg="secondary" pill aria-hidden="true">Blog</Badge>
            </Card.Header>

            <Card.Body>
              <Card.Text>
                <a href={blogToShow.url} target="_blank" rel="noopener noreferrer">{blogToShow.url}</a>
              </Card.Text>

              <div className="d-flex align-items-center mb-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => like(blogToShow.id)}
                  aria-label={`Me gusta ${blogToShow.title}`}
                >
                  Me gusta
                </Button>
                <span className="ms-2 small text-muted">{blogToShow.likes || 0} likes</span>
              </div>

              <p className="text-muted">added by {blogToShow.author}</p>

              <hr />

              <h5>Comentarios</h5>

              <Form onSubmit={(e) => { e.preventDefault(); if (comment.trim()) commentBlog(blogToShow.id) }} aria-label="Formulario añadir comentario" className="mb-3">
                <Form.Group controlId="commentInput" className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Escribe un comentario..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    aria-label="Comentario"
                  />
                  <Button type="submit" variant="primary" className="ms-2" aria-label="Añadir comentario">Añadir</Button>
                </Form.Group>
              </Form>

              <ListGroup variant="flush">
                {(!blogToShow.comments || blogToShow.comments.length === 0) ? (
                  <ListGroup.Item className="text-muted">No hay comentarios</ListGroup.Item>
                ) : (
                  (blogToShow.comments || []).map((c, index) => (
                    <ListGroup.Item key={index}>{c}</ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogDescription