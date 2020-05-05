import React, { useState } from 'react'

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

import { getPostDetailsJSON } from '../../utils/'

const AddFormSection = ({ classes, addPost }) => {
  const [imgIsLink, setIsLink] = useState(false)
  const [postData, setPostData] = useState({
    title: '',
    pushtoHashtags: '',
    hashtags: ['jabascript', 'workout', 'abs'],
    body: '',
    imgURL: '',
    imgFile: {}
  })
  const { title, hashtags, body, pushtoHashtags, imgURL, imgFile } = postData

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
    hashtags.splice(i, 1)

    setPostData({
      ...postData,
      hashtags
    })
  }

  const handleSaveImage = file => {
    console.log(file[0])
    setPostData({
      ...postData,
      imgFile: file[0]
    })

    setDialogIsOpen(false)

    console.log(postData)
  }

  const handleUploadClick = () => {
    setDialogIsOpen(true)
    setIsLink(false)
  }

  const handleAddLink = () => {
    setIsLink(!imgIsLink)

    if (imgFile) setPostData({ ...postData, imgFile: {} })
  }

  const handleAddPost = async () => {
    const details = getPostDetailsJSON(postData)
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

          {imgIsLink && (
            <TextField
              label='Url'
              name='imgURL'
              value={imgURL}
              autoFocus={true}
              onChange={onChange}
              className={classes.imgURLTextfield}
            />
          )}

          {!imgIsLink && postData.imgFile.name && (
            <span
              className={classes.uploadImageInfo}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              {postData.imgFile.name}

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
