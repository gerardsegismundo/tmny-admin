import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

// Primary
const StyledIconPrimaryButton = withStyles({
  root: {
    background:
      'linear-gradient(45deg,rgba(2, 0, 36, 1) 0%,rgba(9, 83, 121, 1) 35%,rgba(0, 212, 255, 1) 100%)',
    color: 'white',
    backgroundSize: '200% 100%',
    transition: 'all ease-in-out 0.3s',
    opacity: 0.8,

    '&:hover': {
      background:
        'linear-gradient(45deg,rgba(2, 0, 36, 1) 0%,rgba(9, 83, 121, 1) 35%,rgba(0, 212, 255, 1) 100%)',
      color: 'white',
      backgroundPosition: '100% 0',
      transition: 'all 0.2s ease-in-out',
      opacity: 0.9
    }
  }
})(IconButton)

// Secondary
const StyledSecondaryIconButton = withStyles({
  root: {
    background: 'red',
    color: 'white'
  }
})(IconButton)

export default ({ color = 'primary', children }) =>
  color === 'primary' ? (
    <StyledIconPrimaryButton>{children}</StyledIconPrimaryButton>
  ) : (
    <StyledSecondaryIconButton>{children}</StyledSecondaryIconButton>
  )
