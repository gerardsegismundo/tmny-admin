import axios from 'axios'

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

  console.log('getPosts')
}

export const addPost = (details, imgFile) => async dispatch => {
  const formData = new FormData()

  formData.append('details', details)
  formData.append('imgFile', imgFile)

  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const res = await axios.post('/api/posts', formData, config)

    console.log(res)
  } catch (err) {
    console.log(err)
  }
}
