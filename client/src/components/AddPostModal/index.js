import React, { useState } from 'react'
import { Zoom, Backdrop, Modal } from '@material-ui/core/'
import AddFormSection from './AddFormSection'
import ImageUploadSection from './ImageUploadSection'

import AddPostModalStyles from '../../styles/AddPostModal.styles'

const AddPostModal = ({ isOpen, handleOpen, handleClose }) => {
  const classes = AddPostModalStyles()

  const [isOnAddForm, setIsOnAddForm] = useState(false)

  const handleOnNext = () => setIsOnAddForm(false)
  const handleOnPrevious = () => setIsOnAddForm(true)

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
          {isOnAddForm ? (
            <AddFormSection handleOnNext={handleOnNext} classes={classes} />
          ) : (
            <ImageUploadSection handleOnPrevious={handleOnPrevious} />
          )}
        </div>
      </Zoom>
    </Modal>
  )
}

export default AddPostModal
