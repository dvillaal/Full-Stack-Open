import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer.js'
import { Nav, Navbar, Container, Button, Badge } from 'react-bootstrap'

const Menu = () => {
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const handleLogout = async () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">BlogApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/">blogs</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/users">users</Nav.Link>
            </Nav.Item>
          </Nav>

          <Nav className="align-items-center">
            {user && user.name ? (
              <>
                <Navbar.Text className="me-3" aria-live="polite">
                  <span className="me-2">Signed in as</span>
                  <strong>{user.name}</strong>
                </Navbar.Text>
                <Badge bg="secondary" pill className="me-3" aria-hidden="true">@{user.username}</Badge>
                <Button variant="outline-light" size="sm" onClick={handleLogout} aria-label="Cerrar sesión">Logout</Button>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link as={Link} to="/login">login</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu