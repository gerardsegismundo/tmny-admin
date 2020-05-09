import React from 'react'
import { Zoom, Backdrop, Modal } from '@material-ui/core/'
import AddFormSection from './AddFormSection'

import AddPostModalStyles from '../../styles/AddPostModal.styles'

const AddPostModal = ({ isOpen, handleOpen, handleClose }) => {
  const classes = AddPostModalStyles()

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
          <AddFormSection classes={classes} closeForm={handleClose} />
        </div>
      </Zoom>
    </Modal>
  )
}

export default AddPostModal
