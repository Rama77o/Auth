import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {

  const { resetPassword } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check yyour inbox to get new password")
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email" placeholder="Enter email" ref={emailRef}/>
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-3 w-100'  disabled={loading}>Reset Password</Button>
          </Form>
          <div className='mt-3 text-center w-100'>
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 mt-2 text-center'>
        Need an acount? <Link to="/signup">Signup</Link>
      </div>
    </>
  )
}

export default ForgotPassword