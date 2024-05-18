import React, { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const { login } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const emailRef = useRef();
  const passwordRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, {replace: true})
    } catch {
      setError("Failed to log In");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email" placeholder="Enter email" ref={emailRef}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control id="password" type="text" placeholder="Enter password" ref={passwordRef}/>
            </Form.Group>

            <Button variant='primary' type='submit' className='mt-3 w-100' disabled={loading}>Log In</Button>
          </Form>
          <div className='mt-3 text-center w-100'>
            <Link to="/forgot-password">Forget Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 mt-2 text-center'>
        Need an acount? <Link to="/signup">Signup</Link>
      </div>
    </>
  )
}

export default Login