import React, { useState } from 'react'
import { Alert, Button, Card } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async() => {
    setError("")
      try {
        await logout();
        navigate("/login")
      } catch {
          setError("Failed to log out")
      }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email:</strong>{currentUser && currentUser.email}
          {/* <Link to="/update-profile" className='btn btn-primary w-100 mt-3'>update profile</Link> */}
        </Card.Body>
      </Card>
      <div className='text-center mt-2 w-100'>
        <Button className='btn btn-primary' onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}

export default Dashboard