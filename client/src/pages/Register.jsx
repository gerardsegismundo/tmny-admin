import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, TextField, LinearProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { setIsLoading } from '../redux/ui/ui.actions'
import { register } from '../redux/auth/auth.actions'

import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded'
import { NotificationManager } from 'react-notifications'

const Register = ({
  isAuthenticated,
  isLoading,
  authError,
  setIsLoading,
  register
}) => {
  const [formData, setFormData] = useState({
    email: 'hahaha',
    password: 'hahaha',
    confirmPassword: 'hahaha'
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

  const { email, password, confirmPassword } = formData

  const onSubmit = e => {
    e.preventDefault()

    setIsLoading(true)

    setTimeout(() => {
      if (password !== confirmPassword) {
        setError({
          keys: ['confirmPassword'],
          msg: "Those passwords didn't match. Try again."
        })

        setFormData({
          ...formData,
          confirmPassword: ''
        })

        setIsLoading(false)

        return
      }

      register(email, password)

      if (authError) NotificationManager.success('Account created.', 'Success')

      setIsLoading(false)
    }, 1500)
  }

  if (isAuthenticated) return <Redirect to='/dashboard' />

  return (
    <div className='register'>
      <Card className='register__card' display='flex'>
        {isLoading && <LinearProgress className='register__card__progress' />}

        <h1 className='register__card__title'>themomnurseyogi</h1>
        <form className='register__card__form' onSubmit={e => onSubmit(e)}>
          <TextField
            label='Email Address'
            name='email'
            value={email}
            autoFocus={true}
            disabled={isLoading}
            onChange={e => onChange(e)}
            error={error.keys.includes('email')}
            type='email'
          />

          <TextField
            label='Password'
            name='password'
            type='password'
            value={password}
            disabled={isLoading}
            className='register__card__form--password'
            onChange={e => onChange(e)}
            error={error.keys.includes('password')}
          />

          <TextField
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            disabled={isLoading}
            className='register__card__form--confirm-password'
            onChange={e => onChange(e)}
            error={error.keys.includes('confirmPassword')}
          />

          {error.keys.length > 0 && error.msg && (
            <span className='register__card__form--error-msg'>
              <ErrorRoundedIcon fontSize='small' />
              &nbsp;
              {error.msg}
            </span>
          )}
          <Button
            className='register__card__form--submit-btn'
            variant='contained'
            color='primary'
            type='submit'
            disabled={isLoading}
          >
            Create account
          </Button>
        </form>
      </Card>
    </div>
  )
}

const mapStateToProps = ({ ui, auth }) => ({
  isLoading: ui.isLoading,
  authError: auth.error,
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { register, setIsLoading })(Register)
