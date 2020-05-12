import axios from 'axios'
import _ from 'lodash'

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: 'GET_POSTS',
      payload: res.data
    })
  } catch (err) {
    console.warn(err)
  }
}

const addPostWithImgFile = async (details, imgFile) => {
  const fd = new FormData()

  fd.append('details', details)
  fd.append('imgFile', imgFile)

  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const res = await axios.post('/api/posts', fd, config)

    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

const addPostwithImgURL = async (details, dispatch) => {
  delete details.imgFile
  delete details.pushtoHashtags

  try {
    const res = await axios.post('/api/posts', details)

    dispatch({
      type: 'ADD_POST',
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const addPost = (details, imgFile) => async dispatch => {
  // with image file
  if (!_.isEmpty(imgFile)) {
    addPostWithImgFile(details, imgFile)
  }
  // with image url
  else {
    addPostwithImgURL(details, dispatch)
  }
}

export const updatePost = (formData, id, imgFile) => async dispatch => {
  // With image url
  delete formData.pushtoHashtags

  console.log('ACTION: ', formData.title)
  try {
    const res = await axios.put(`/api/posts/${id}`, formData)

    dispatch({
      type: 'UPDATE_POST',
      payload: res.data
    })
  } catch (error) {}
}

export const deletePost = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}`)

    dispatch({ type: 'DELETE_POST', payload: res.data.id })
  } catch (error) {}
}
