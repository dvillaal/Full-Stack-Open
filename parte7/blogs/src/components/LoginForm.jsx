import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    createLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin} aria-label="Formulario de login" data-testid="login-form">
      <Form.Group className="mb-3" controlId="loginUsername">
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          aria-label="Nombre de usuario"
          data-testid="username-input"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          aria-label="Contraseña"
          data-testid="password-input"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" data-testid="login-button" aria-label="Iniciar sesión">login</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired
}


export default LoginForm