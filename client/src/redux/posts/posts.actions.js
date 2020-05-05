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
