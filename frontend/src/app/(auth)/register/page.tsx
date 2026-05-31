import { apiRequest } from '@/services/api'
import { AuthUser, useAuthStore } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

type RegisterResponse = {
  token: string
  user: AuthUser
}

const Register = () => {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerMutation = useMutation({
    mutationFn: () =>
      apiRequest<RegisterResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      }),
    onSuccess: ({ token, user }) => {
      setSession(token, user)
      navigate('/dashboard', { replace: true })
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    registerMutation.mutate()
  }

  return (
    <section className="min-vh-100 bg-light d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="border-0 shadow-sm">
              <CardBody className="p-4 p-md-5">
                <h3 className="text-dark mb-2">Create Account</h3>
                <p className="text-muted mb-4">Register with a username and password.</p>
                {registerMutation.isError && <Alert variant="danger">{registerMutation.error.message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="registerUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="w-100" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Form>
                <p className="mb-0 text-muted text-center mt-4">
                  Already registered? <Link to="/login">Sign in</Link>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register
