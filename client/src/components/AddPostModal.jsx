import React, { useState } from 'react'
import {
  Zoom,
  Backdrop,
  Modal,
  TextField,
  TextareaAutosize,
  Chip,
  Button
} from '@material-ui/core/'

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import AddIcon from '@material-ui/icons/Add'
import AddPostModalStyles from '../styles/AddPostModal.styles'
import StyledIconButton from '../styles/styledComponents/StyledIconButton'

const AddPostModal = ({ isOpen, handleOpen, handleClose }) => {
  const classes = AddPostModalStyles()
  const [formData, setFormData] = useState({
    title: '',
    pushtoHashtags: 'tae',
    hashtags: [],
    body: ''
  })

  const { title, hashtags, body, pushtoHashtags } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddHashtag = () => {
    if (!pushtoHashtags) return

    setFormData({
      ...formData,
      pushtoHashtags: '',
      hashtags: [...hashtags, pushtoHashtags]
    })
  }

  const handleDeleteHashtag = i => {
    let { hashtags } = formData
    hashtags.splice(i, 1)

    setFormData({
      ...formData,
      hashtags
    })
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
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
          <h2 className={classes.heading}>New Post</h2>
          <form className={classes.form}>
            <TextField
              label='Title'
              name='title'
              value={title}
              autoFocus={true}
              onChange={onChange}
              className={classes.titleTextfield}
            />

            <div className='add-post-modal__hashtags-input'>
              <TextField
                label='Hashtag'
                name='pushtoHashtags'
                onChange={onChange}
                className={classes.hashtagsTextfield}
                value={pushtoHashtags}
              />

              <StyledIconButton
                className={classes.hashtagsButton}
                size='small'
                onClick={handleAddHashtag}
              >
                <AddIcon fontSize='small' />
              </StyledIconButton>
            </div>

            {hashtags &&
              hashtags.map((h, i) => (
                <Zoom key={i} in={!hashtags.includes(i)}>
                  <Chip
                    label={h}
                    onDelete={() => handleDeleteHashtag(i)}
                    color='primary'
                    className={classes.hashtagChips}
                  />
                </Zoom>
              ))}

            <TextareaAutosize
              className={classes.bodyTextarea}
              aria-label='body textarea'
              placeholder='body'
              name='body'
              vallue={body}
            />

            <Button
              variant='contained'
              color='primary'
              className={classes.submitBtn}
              endIcon={<NavigateNextOutlinedIcon />}
            >
              Next
            </Button>
          </form>
        </div>
      </Zoom>
    </Modal>
  )
}

export default AddPostModal
