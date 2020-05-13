import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, AppBar, Toolbar, IconButton } from '@material-ui/core/'
import { Typography, Slide } from '@material-ui/core/'
import CloseIcon from '@material-ui/icons/Close'

import formatDate from '../utils/formatDate'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef((props, ref) => (
  <Slide direction='up' ref={ref} {...props} />
))

const ViewPostDialog = props => {
  const { isOpen, handleClose, date } = props
  const { title, hashtags, body, imgURL, imgFile, comments, likes } = props

  const classes = useStyles()

  console.log(props)

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Post view
          </Typography>
          <Button autoFocus color='inherit' onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      {title && (
        <div className='post-container'>
          <p className='post-container--date'>{formatDate(date)}</p>
          <h1 className='post-container--title'>{title}</h1>
          <p className='post-container--hashtags'>
            {hashtags.map(h => (
              <span>#{h}</span>
            ))}
          </p>
          <img className='post-container--img' src={imgURL}></img>
          <center>
            <p className='post-container--body'>{body}</p>
          </center>
          <p>{likes.length}likes</p>
          <hr></hr>
          <h2>{comments.length}Comments</h2>
          {comments &&
            comments.map(({ avatar, date, name, text, _id }) => (
              <li key={_id}>
                <h3>{name}</h3>
                <img src={avatar}></img>
                <p>{text}</p>
              </li>
            ))}
          {/* {comments && comments.map(comment => <li>{comment}</li>)} */}
        </div>
      )}
    </Dialog>
  )
}

export default ViewPostDialog
