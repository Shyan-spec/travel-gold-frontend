import Loginform from '../../components/LoginForm/Loginform'
import './Login.css'
import { useState } from 'react'

const Login = (props) => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }
  return (
    <main className="container">
      <h1>Log In</h1>
      <p>{message}</p>
      <Loginform
        {...props}
        updateMessage={updateMessage}
      />
    </main>
  )
}

export default Login