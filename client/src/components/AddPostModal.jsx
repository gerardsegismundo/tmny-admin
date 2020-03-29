import React, { useState } from 'react'
import {
  Zoom,
  Backdrop,
  Modal,
  TextField,
  TextareaAutosize
} from '@material-ui/core/'

import AddIcon from '@material-ui/icons/Add'

import AddPostModalStyles from '../styles/AddPostModal.styles'
import StyledIconButton from '../styles/styledComponents/StyledIconButton'

const AddPostModal = ({ isOpen, handleOpen, handleClose }) => {
  const classes = AddPostModalStyles()

  const [formData, setFormData] = useState({
    title: '',
    hashtags: [],
    body: ''
  })

  const { title, hashtags, body } = formData

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={isOpen}
      // open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Zoom in={isOpen}>
        {/* <Zoom in={true}> */}
        <div className={classes.paper}>
          <h2 id='transition-modal-title'>New Post</h2>

          <TextField
            label='Title'
            name='title'
            value={title}
            autoFocus={true}
            className={classes.titleTextfield}
          />
          <div>
            <TextField
              label='Hashtags'
              name='hashtags'
              className={classes.hashtagsTextfield}
              value={hashtags.map(h => h)}
            />
            <StyledIconButton size='small'>
              <AddIcon fontSize='small' />
            </StyledIconButton>
          </div>

          <TextareaAutosize
            className={classes.bodyTextarea}
            aria-label='body textarea'
            rowsMin={3}
            placeholder='body'
            name='body'
            vallue={body}
          />
        </div>
      </Zoom>
    </Modal>
  )
}

export default AddPostModal
