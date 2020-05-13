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
import ViewPostDialog from '../components/ViewPostDialog'

import { deletePost } from '../redux/posts/posts.actions'

const Posts = ({ posts, deletePost }) => {
  const classes = usePostStyles()

  const [currentId, setCurrentId] = useState(null)

  const [viewDialogIsOpen, setViewDialogIsOpen] = useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)

  const handleView = id => {
    setCurrentId(id)
    setViewDialogIsOpen(true)
  }

  const handleDelete = id => {
    setCurrentId(id)
    setDeleteDialogIsOpen(true)
  }

  const handleEdit = id => {
    setCurrentId(id)
    setEditModalIsOpen(true)
  }

  return (
    <div className='posts'>
      <h2 className='posts--heading'>POSTS</h2>
      <ul>
        {posts &&
          posts.map(props => (
            <PostItem
              {...props}
              key={props._id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleView={handleView}
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
        editId={/* editId */ currentId}
      ></EditPostModal>

      <DeletePostDialog
        isOpen={deleteDialogIsOpen}
        handleClose={() => setDeleteDialogIsOpen(false)}
        confirmDelete={() => deletePost(/* deleteId */ currentId)}
      />

      <ViewPostDialog
        {...posts.filter(post => post._id === currentId)[0]}
        isOpen={viewDialogIsOpen}
        handleClose={() => setViewDialogIsOpen(false)}
      ></ViewPostDialog>
    </div>
  )
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.items
})

export default connect(mapStateToProps, { deletePost })(Posts)
