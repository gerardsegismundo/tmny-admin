import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, AppBar, Toolbar, IconButton } from '@material-ui/core/'
import { Typography, Slide } from '@material-ui/core/'
import CloseIcon from '@material-ui/icons/Close'
import LikeIcon from '@material-ui/icons/Favorite'

import formatDate from '../utils/formatDate'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundImage:
      'linear-gradient( 45deg, rgba(2, 0, 36, 1) 0%, rgba(9, 83, 121, 1) 35%, rgb(0, 143, 255) 100% )'
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

          <p className='post-container--body'>{body}</p>

          <span className='post-container--likes'>
            <LikeIcon fontSize='large' />
            {likes.length} likes
          </span>

          <div className='comments'>
            <p className='comments--heading'>
              <span>Comments</span>
              <span>
                {comments.length} comment{comments.length > 1 ? 's' : null}
              </span>
            </p>
            {comments &&
              comments.map(({ avatar, date, name, text, _id }) => (
                <li className='comments__items' key={_id}>
                  <img src={avatar}></img>
                  <div>
                    <p className='comments__items--label'>
                      {name} | {formatDate(date)}
                    </p>
                    <p className='comments__items--body'>{text}</p>
                  </div>
                </li>
              ))}
            {/* {comments && comments.map(comment => <li>{comment}</li>)} */}
          </div>
        </div>
      )}
    </Dialog>
  )
}

export default ViewPostDialog
