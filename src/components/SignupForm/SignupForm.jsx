import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignupForm.module.css'
import Logo from '../../assets/Logo.png'

import * as  authService from '../../services/authService'

export const SignupForm = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

    const handleRefresh = () => {
      window.location.reload();
    }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.inputContainer}
      >
        
      <div className={styles.icon}>
      <img src={Logo} className={styles.Loogo}/>
      </div>
    
      <div>
        <label htmlFor="name" className={styles.nameLabel}>Name</label>
        <input className={styles.signForm}
          type="text"
          autoComplete="off"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="email" className={styles.label}>Email</label>
        <input className={styles.signForm}
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="password" className={styles.label}>Password</label>
        <input className={styles.signForm}
          type="password"
          autoComplete="off"
          id="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div >
        <label htmlFor="confirm" className={styles.label}>
          Confirm Password
        </label>
        <input className={styles.signForm}
          type="password"
          autoComplete="off"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
        />
      </div>
      <div className={styles.saveCancelClass}>
        <button disabled={isFormInvalid()} className={styles.signuppButton}>
          Sign Up
        </button>
        <Link to="/" >
  <button className={styles.cancellButton} onClick={handleRefresh}   >Cancel</button>
</Link>
      </div>
    </form>
  )
}

export default SignupForm