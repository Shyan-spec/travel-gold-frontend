import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.css'
import { useState } from 'react'

function Signup(props) {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }
  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <SignupForm {...props} updateMessage={updateMessage} />
    </main>
  )
}

export default Signup