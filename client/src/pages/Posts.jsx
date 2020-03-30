import React, { useState } from 'react'
import { connect } from 'react-redux'

import usePostStyles from '../styles/Posts.styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Tooltip } from '@material-ui/core'
import AddPostModal from '../components/AddPostModal'
import PostItem from '../components/PostItem'

const Posts = ({ posts }) => {
  const classes = usePostStyles()

  // Post modal props
  const [isOpen, setIsOpen] = useState(false),
    handleOpen = () => setIsOpen(true),
    handleClose = () => setIsOpen(false)

  return (
    <div className='posts'>
      <h2 className='posts--heading'>POSTS</h2>
      <ul>
        {posts.map(props => (
          <PostItem {...props} key={props._id} />
        ))}
      </ul>

      <Tooltip title='Create post'>
        <Fab
          className={classes.fab}
          color='secondary'
          aria-label='add'
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <AddPostModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  )
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.items
})

export default connect(mapStateToProps)(Posts)
