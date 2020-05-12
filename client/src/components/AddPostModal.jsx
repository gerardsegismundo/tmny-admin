import React from 'react'
import { Zoom, Backdrop, Modal } from '@material-ui/core/'
import AddForm from './AddForm'

import PostModalStyles from '../styles/PostModal.styles'

const AddPostModal = ({ isOpen, handleOpen, handleClose }) => {
  const classes = PostModalStyles()

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Zoom in={isOpen}>
        <div className={classes.paper}>
          <AddForm classes={classes} closeForm={handleClose} />
        </div>
      </Zoom>
    </Modal>
  )
}

export default AddPostModal
