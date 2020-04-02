import React, { useState } from 'react'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import AddIcon from '@material-ui/icons/Add'

import {
  Zoom,
  TextField,
  TextareaAutosize,
  Chip,
  Button
} from '@material-ui/core/'

import StyledIconButton from '../../styles/styledComponents/StyledIconButton'

import useOnKeyDownEnter from '../../hooks/useOnKeyDownEnter'

const AddFormSection = ({ handleOnNext, classes }) => {
  const [formData, setFormData] = useState({
    title: '',
    pushtoHashtags: '',
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

  useOnKeyDownEnter('hastags-textfield', handleAddHashtag)

  const handleDeleteHashtag = i => {
    let { hashtags } = formData
    hashtags.splice(i, 1)

    setFormData({
      ...formData,
      hashtags
    })
  }
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
          placeholder='Body'
          name='body'
          vallue={body}
        />

        <Button
          variant='contained'
          color='primary'
          className={classes.submitBtn}
          endIcon={<NavigateNextOutlinedIcon />}
          onClick={handleOnNext}
        >
          Next
        </Button>
      </form>
    </>
  )
}

export default AddFormSection
