import React, { useState } from 'react'
import { connect } from 'react-redux'

import usePostStyles from '../styles/Posts.styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Tooltip } from '@material-ui/core'
import PostItem from '../components/PostItem'

import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditModal'
import DeletePostDialog from '../components/DeletePostDialog'

import { deletePost } from '../redux/posts/posts.actions'

const Posts = ({ posts, deletePost }) => {
  const classes = usePostStyles()

  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [editId, setEditId] = useState(null)

  const handleDelete = id => {
    setDeleteId(id)
    setDeleteDialogIsOpen(true)
  }

  const handleEdit = id => {
    setEditId(id)
    setEditModalIsOpen(true)
  }

  const handleClose = () => {
    setDeleteId(null)
    setDeleteDialogIsOpen(false)
  }

  return (
    <div className='posts'>
      <h2 className='posts--heading'>POSTS</h2>
      <ul>
        {posts.map(props => (
          <PostItem
            {...props}
            key={props._id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
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

      <EditPostModal
        isOpen={editModalIsOpen}
        handleOpen={() => setEditModalIsOpen(true)}
        handleClose={() => setEditModalIsOpen(false)}
        editId={editId}
      ></EditPostModal>

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
