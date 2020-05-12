import React from 'react'
import { Zoom, Backdrop, Modal } from '@material-ui/core/'
import EditForm from './EditForm'

import PostModalStyles from '../styles/PostModal.styles'

const EditPostModal = ({ isOpen, handleOpen, handleClose, editId }) => {
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
          <EditForm classes={classes} closeForm={handleClose} editId={editId} />
        </div>
      </Zoom>
    </Modal>
  )
}

export default EditPostModal
