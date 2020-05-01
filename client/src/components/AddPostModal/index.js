import React from 'react'
import { Zoom, Backdrop, Modal } from '@material-ui/core/'
import AddFormSection from './AddFormSection'

import AddPostModalStyles from '../../styles/AddPostModal.styles'

const AddPostModal = ({ isOpen, handleOpen, handleClose }) => {
  const classes = AddPostModalStyles()

  return (
    <Modal
      className={classes.modal}
      // open={isOpen}
      open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      {/* <Zoom in={isOpen}> */}
      <Zoom in={true}>
        <div className={classes.paper}>
          <AddFormSection classes={classes} />
        </div>
      </Zoom>
    </Modal>
  )
}

export default AddPostModal
