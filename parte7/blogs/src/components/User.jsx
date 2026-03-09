import { Link } from 'react-router'

// Componentes de React-Bootstrap para un diseño agradable
import { Container, Card, ListGroup, Badge } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  const blogs = user.blogs || []

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header>
          <Card.Title as="h2" className="mb-0">{user.name}</Card.Title>
          {user.username ? <Card.Subtitle className="text-muted">@{user.username}</Card.Subtitle> : null}
        </Card.Header>
        <Card.Body>
          <h3 className="h5">Added blogs</h3>
          {blogs.length === 0 ? (
            <p className="text-muted">Este usuario no ha añadido blogs.</p>
          ) : (
            <ListGroup variant="flush" aria-label={`Lista de blogs de ${user.name}`} data-testid="user-blogs-list">
              {blogs.map(blog => (
                <ListGroup.Item key={blog.id} className="d-flex justify-content-between align-items-center">
                  <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                    {blog.title}
                  </Link>
                  <Badge bg="secondary" pill className="ms-2">ver</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default User