import { Link } from 'react-router'

// Componentes de React-Bootstrap para un diseño agradable
import { Container, Card, Table, Badge } from 'react-bootstrap'

const Users = ({ users = [] }) => {

  if (!users || users.length === 0) {
    return (
      <Container className="my-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Users</Card.Title>
            <p className="text-muted">No hay usuarios para mostrar.</p>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header>
          <Card.Title as="h2" className="mb-0">Users</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover aria-label="Tabla de usuarios" data-testid="users-table">
            <caption className="visually-hidden">Lista de usuarios y cantidad de blogs creados</caption>
            <thead>
              <tr>
                <th>Usuario</th>
                <th className="text-center">blogs creados</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`} className="text-decoration-none">
                      <strong>{user.username}</strong>
                    </Link>
                    {user.name ? <div className="text-muted small">{user.name}</div> : null}
                  </td>
                  <td className="text-center">
                    <Badge bg="info" pill>{(user.blogs && user.blogs.length) || 0}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Users
