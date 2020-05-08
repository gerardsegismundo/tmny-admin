import React, { useState, useEffect } from 'react'

import {
  Zoom,
  TextField,
  TextareaAutosize,
  Chip,
  Button,
  Box
} from '@material-ui/core/'
import UploadIcon from '@material-ui/icons/Publish'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import LinkIcon from '@material-ui/icons/Link'
import StyledIconButton from '../../styles/styledComponents/StyledIconButton'
import { DropzoneDialog } from 'material-ui-dropzone'
import useOnKeyDownEnter from '../../hooks/useOnKeyDownEnter'

import { connect } from 'react-redux'
import { addPost } from '../../redux/posts/posts.actions'

import { getPostDetailsJSON, isValidURL } from '../../utils/'

const AddFormSection = ({ classes, addPost, existingPosts }) => {
  const [imgIsLink, setIsLink] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    pushtoHashtags: '',
    hashtags: [],
    body: '',
    imgURL: '',
    imgFile: {}
  })

  const { title, hashtags, body, pushtoHashtags, imgURL, imgFile } = formData

  const [error, setError] = useState({
    title: '',
    pushtoHashtags: '',
    hashtags: [],
    body: '',
    imgURL: '',
    imgFile: {}
  })
  const hasError = label => (error[label].length > 0 ? true : false)
  const getError = label => (error[label] ? error[label] : null)

  const onChange = e => {
    const { name, value } = e.target

    if (hasError(name)) setError({ ...error, [name]: '' })
    setFormData({ ...formData, [name]: value })
  }
  const clearForm = () => {
    setFormData({
      title: '',
      pushtoHashtags: '',
      hashtags: [],
      body: '',
      imgURL: '',
      imgFile: {}
    })
  }

  const handleAddHashtag = () => {
    if (!pushtoHashtags) return

    if (hashtags.includes(pushtoHashtags)) {
      return setError({ ...error, pushtoHashtags: 'Hashtag already exists.' })
    }

    setFormData({
      ...formData,
      pushtoHashtags: '',
      hashtags: [...hashtags, pushtoHashtags]
    })
  }

  useOnKeyDownEnter('hastags-textfield', handleAddHashtag)

  const handleDeleteHashtag = i => {
    hashtags.splice(i, 1)

    setFormData({
      ...formData,
      hashtags
    })
  }

  const handleSaveImage = file => {
    setFormData({
      ...formData,
      imgFile: file[0]
    })

    setDialogIsOpen(false)
  }

  const handleUploadClick = () => {
    setDialogIsOpen(true)
    setIsLink(false)
  }

  const handleAddLink = () => {
    setIsLink(!imgIsLink)
    if (imgFile) setFormData({ ...formData, imgFile: {} })
  }

  const handleAddPost = async () => {
    setError({
      ...error,
      title: existingPosts.includes(formData.title)
        ? 'Title already exists.'
        : '',
      imgURL:
        formData.imgURL && !isValidURL(formData.imgURL)
          ? 'Not a valid URL format'
          : ''
    })

    if (error.imgURL.length > 0 || error.title.length > 0) {
      return console.log('ERRROR!!')
    } else {
      console.log('ADDPOST!!!')
    }
  }

  const cancelImg = () => {
    setFormData({
      ...formData,
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
          error={hasError('title')}
          helperText={getError('title')}
        />

        <div className='add-post-modal__hashtags-input'>
          <TextField
            id='hastags-textfield'
            label='Hashtag'
            name='pushtoHashtags'
            onChange={onChange}
            className={classes.hashtagsTextfield}
            value={pushtoHashtags}
            error={hasError('pushtoHashtags')}
            helperText={getError('pushtoHashtags')}
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
            endIcon={<UploadIcon />}
            onClick={handleUploadClick}
          >
            Image upload
          </Button>
          <Button
            onClick={handleAddLink}
            variant='contained'
            color='primary'
            className={classes.uploadImage}
            endIcon={<LinkIcon />}
          >
            Image Link
          </Button>

          {!imgIsLink && formData.imgFile.name && (
            <span
              className={classes.uploadImageInfo}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              {formData.imgFile.name}

              <CancelIcon
                className={classes.cancelIcon}
                color='secondary'
                onClick={cancelImg}
                style={{ marginLeft: '1rem', cursor: 'pointer' }}
              />
            </span>
          )}
        </div>

        {imgIsLink && (
          <TextField
            label='Url'
            name='imgURL'
            value={imgURL}
            autoFocus={true}
            onChange={onChange}
            className={classes.imgURLTextfield}
            error={hasError('imgURL')}
            helperText={getError('imgURL')}
          />
        )}

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
          // error={hasError('body')}
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

const mapStateToProps = ({ posts }) => ({
  existingPosts: posts.items.map(({ title }) => title)
})

export default connect(mapStateToProps, { addPost })(AddFormSection)
