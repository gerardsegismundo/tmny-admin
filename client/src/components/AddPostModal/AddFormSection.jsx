import React, { useState } from 'react'

import {
  Zoom,
  TextField,
  TextareaAutosize,
  Chip,
  Button,
  Box
} from '@material-ui/core/'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import StyledIconButton from '../../styles/styledComponents/StyledIconButton'
import { DropzoneDialog } from 'material-ui-dropzone'
import useOnKeyDownEnter from '../../hooks/useOnKeyDownEnter'

import { connect } from 'react-redux'
import { addPost } from '../../redux/posts/posts.actions'

const AddFormSection = ({ classes, addPost }) => {
  const [postData, setPostData] = useState({
    title: '',
    pushtoHashtags: '',
    hashtags: ['jabascript', 'workout', 'abs'],
    body: '',
    imgFile: {}
  })
  const { title, hashtags, body, pushtoHashtags } = postData

  const onChange = e => {
    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  const handleAddHashtag = () => {
    if (!pushtoHashtags) return

    setPostData({
      ...postData,
      pushtoHashtags: '',
      hashtags: [...hashtags, pushtoHashtags]
    })
  }

  useOnKeyDownEnter('hastags-textfield', handleAddHashtag)

  const handleDeleteHashtag = i => {
    let { hashtags } = postData
    hashtags.splice(i, 1)

    setPostData({
      ...postData,
      hashtags
    })
  }

  const handleSaveImage = imgFile => {
    setPostData({
      ...postData,
      imgFile
    })
    setDialogIsOpen(false)
  }

  const getPostDetails = () => {
    let postDetails = { ...postData }
    delete postDetails.pushtoHashtags
    delete postDetails.imgFile

    return postDetails
  }

  // const handleAddPost = () => addPost(getPostDetails())
  const handleAddPost = async () => {
    const imgFile = postData.imgFile[0]
    const details = JSON.stringify(getPostDetails())

    addPost(details, imgFile)
  }

  const cancelImg = () => {
    setPostData({
      ...postData,
      imgFile: {}
    })
  }

  const [isDialogOpen, setDialogIsOpen] = useState(false)

  return (
    <>
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
            id='hastags-textfield'
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

        <Box className={classes.hashtagsContainer} display='flex'>
          <Box component='label' className={classes.hashtagsLabel}>
            Hashtags:
          </Box>
          <Box>
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
          </Box>
        </Box>

        <hr />

        <div className={classes.uploadImageContainer}>
          <Button
            variant='contained'
            color='primary'
            className={classes.uploadImage}
            endIcon={<PhotoCameraIcon />}
            onClick={() => setDialogIsOpen(true)}
          >
            Image upload
          </Button>

          {postData.imgFile[0] && (
            <span
              className={classes.uploadImageInfo}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              {postData.imgFile[0].name}

              <CancelIcon
                className={classes.cancelIcon}
                color='secondary'
                onClick={cancelImg}
                style={{ marginLeft: '1rem', cursor: 'pointer' }}
              />
            </span>
          )}
        </div>

        <DropzoneDialog
          open={isDialogOpen}
          onSave={handleSaveImage}
          acceptedFiles={['image/jpeg', 'image/png']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => setDialogIsOpen(false)}
          filesLimit={1}
        />

        <TextareaAutosize
          className={classes.bodyTextarea}
          aria-label='body textarea'
          placeholder='Body'
          name='body'
          vallue={body}
        />

        <Button
          variant='contained'
          color='primary'
          className={classes.submitBtn}
          endIcon={<AddIcon />}
          onClick={handleAddPost}
        >
          Add post
        </Button>
      </form>
    </>
  )
}

export default connect(null, { addPost })(AddFormSection)
