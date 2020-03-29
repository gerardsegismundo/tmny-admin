import React, { useState } from 'react'
import { connect } from 'react-redux'

import usePostStyles from '../styles/Posts.styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Tooltip } from '@material-ui/core'
import AddPostModal from '../components/AddPostModal'

const Posts = ({ posts }) => {
  const classes = usePostStyles()

  // Post modal props
  const [isOpen, setIsOpen] = useState(false),
    handleOpen = () => setIsOpen(true),
    handleClose = () => setIsOpen(false)

  return (
    posts && (
      <div className='posts'>
        <h2>POSTS</h2>
        <ul>{posts && posts.map(p => <li key={p._id}>{p.body}</li>)}</ul>

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
  )
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.items
})

export default connect(mapStateToProps)(Posts)
