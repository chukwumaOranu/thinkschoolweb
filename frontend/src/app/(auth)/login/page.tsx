import { apiRequest } from '@/services/api'
import { AuthUser, useAuthStore } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type LoginResponse = {
  token: string
  user: AuthUser
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)
  const [username, setUsername] = useState('oranich')
  const [password, setPassword] = useState('Infamous1980')
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard'

  const loginMutation = useMutation({
    mutationFn: () =>
      apiRequest<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.trim(), password }),
      }),
    onSuccess: ({ token, user }) => {
      setSession(token, user)
      navigate(from, { replace: true })
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginMutation.mutate()
  }

  return (
    <section className="min-vh-100 bg-light d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="border-0 shadow-sm">
              <CardBody className="p-4 p-md-5">
                <h3 className="text-dark mb-2">Welcome Back</h3>
                <p className="text-muted mb-4">Sign in with your username and password.</p>
                {loginMutation.isError && <Alert variant="danger">{loginMutation.error.message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="w-100" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Form>
                <p className="mb-0 text-muted text-center mt-4">
                  Need an account? <Link to="/register">Create one</Link>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
