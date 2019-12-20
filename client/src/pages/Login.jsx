import React, { useState, useEffect } from 'react'
import { Button, Card, TextField, LinearProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { setIsLoading } from '../redux/ui/ui.actions'
import { login } from '../redux/auth/auth.actions'

import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded'

const Login = ({ isLoading, authError, setIsLoading, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    keys: [],
    msg: ''
  })

  useEffect(() => {
    authError &&
      setError({
        keys: authError.keys,
        msg: authError.msg
      })
  }, [authError])

  const setTextfieldErrors = e => {
    if (error) {
      error.keys.includes(e.target.name) &&
        setError({
          ...error,
          keys: error.keys.filter(key => key !== e.target.name)
        })
    }
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setTextfieldErrors(e)
  }

  const { email, password } = formData

  const onSubmit = e => {
    e.preventDefault()

    setIsLoading(true)

    setTimeout(() => {
      login(email, password)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className='login'>
      <Card className='login__card' display='flex'>
        {isLoading && <LinearProgress className='login__card__progress' />}

        <h1 className='login__card__title'>themomnurseyogi</h1>
        <form className='login__card__form' onSubmit={e => onSubmit(e)}>
          <TextField
            label='Email'
            name='email'
            value={email}
            autoFocus={true}
            disabled={isLoading}
            onChange={e => onChange(e)}
            error={error.keys.includes('email')}
          />
          <TextField
            label='Password'
            name='password'
            value={password}
            disabled={isLoading}
            className='login__card__form--password'
            onChange={e => onChange(e)}
            error={error.keys.includes('password')}
          />

          {error.keys.length > 0 && error.msg && (
            <span className='register__card__form--error-msg'>
              <ErrorRoundedIcon fontSize='small' />
              &nbsp;
              {error.msg}
            </span>
          )}

          <Button
            className='login__card__form--submit-btn'
            variant='contained'
            color='primary'
            type='submit'
            disabled={isLoading}
          >
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  )
}

const mapStateToProps = ({ ui, auth }) => ({
  isLoading: ui.isLoading,
  authError: auth.error
})

export default connect(mapStateToProps, { login, setIsLoading })(Login)
