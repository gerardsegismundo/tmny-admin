import React from 'react'
import NotFoundSvg from '../assets/notFound.svg'

import { Link } from 'react-router-dom'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const NotFound = () => {
  return (
    <div className='not-found'>
      <NotFoundSvg className={'not-found__notfound-icon'} />
      <Link className='not-found__return-link' to='/'>
        <ArrowBackIcon
          className='not-found__return-link__back-icon'
          color='primary'
        />
        <span>Return to home page.</span>
      </Link>
    </div>
  )
}

export default NotFound
