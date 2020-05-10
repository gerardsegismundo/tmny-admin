import React, { useState } from 'react'
import { connect } from 'react-redux'

import usePostStyles from '../styles/Posts.styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Tooltip } from '@material-ui/core'
import PostItem from '../components/PostItem'

import AddPostModal from '../components/AddPostModal/'
import DeletePostDialog from '../components/DeletePostDialog'

import { deletePost } from '../redux/posts/posts.actions'

const Posts = ({ posts, deletePost }) => {
  const classes = usePostStyles()

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = id => {
    setDeleteId(id)
    setDeleteDialogIsOpen(true)
  }

  const handleClose = () => {
    setDeleteId(null)
    setDeleteDialogIsOpen(false)
  }

  const [addModalIsOpen, setAddModalIsOpen] = useState(false)

  return (
    <div className='posts'>
      <h2 className='posts--heading'>POSTS</h2>
      <ul>
        {posts.map(props => (
          <PostItem {...props} key={props._id} handleDelete={handleDelete} />
        ))}
      </ul>

      <Tooltip title='Create post'>
        <Fab
          color='secondary'
          onClick={() => setAddModalIsOpen(true)}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <AddPostModal
        isOpen={addModalIsOpen}
        handleOpen={() => setAddModalIsOpen(true)}
        handleClose={() => setAddModalIsOpen(false)}
      />

      <DeletePostDialog
        isOpen={deleteDialogIsOpen}
        handleClose={handleClose}
        confirmDelete={() => deletePost(deleteId)}
      />
    </div>
  )
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.items
})

export default connect(mapStateToProps, { deletePost })(Posts)
