import React, { useRef } from 'react'
import './Login.css'

const Register = (props) => {
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const verifyPassword = useRef()

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/customers?email=${email.current.value}`)
      .then((_) => _.json())
      .then((user) => {
        if (user.length) {
          return true
        }
        return false
      })
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      existingUserCheck().then(() => {
        fetch('http://localhost:8088/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
          }),
        })
          .then((_) => _.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty('id')) {
              localStorage.setItem('partySpace_customer', createdUser.id)
            }
          })
      })
    } else {
      window.alert('Passwords do not match')
    }
  }

  return (
    <main className='container--login'>
      <form className='form--register' onSubmit={handleRegister}>
        <h4 className='darkgray'>
          If you are not a customer yet, please register a new account
        </h4>
        <fieldset>
          <label htmlFor='firstName'>Name</label>
          <input
            ref={name}
            type='text'
            name='name'
            className='form-control'
            placeholder='Name'
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor='inputEmail'>Email</label>
          <input
            ref={email}
            type='email'
            name='email'
            className='form-control'
            placeholder='Email address'
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor='inputPassword'>Password</label>
          <input
            ref={password}
            type='password'
            name='password'
            className='form-control'
            placeholder='Password'
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor='verifyPassword'>Verify Password</label>
          <input
            ref={verifyPassword}
            type='password'
            name='verifyPassword'
            className='form-control'
            placeholder='Verify password'
            required
          />
        </fieldset>
        <fieldset>
          <button type='submit'>Sign in</button>
        </fieldset>
      </form>
    </main>
  )
}

export default Register
