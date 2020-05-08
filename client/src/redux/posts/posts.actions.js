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

const addPostwithImgURL = async details => {
  delete details.imgFile
  delete details.pushtoHashtags

  try {
    const res = await axios.post('/api/posts', details)
    console.log(res)
  } catch (error) {}
}

export const addPost = (details, imgFile) => async dispatch => {
  // with IMAGE FILE
  if (imgFile) {
    addPostWithImgFile(details, imgFile)
    // WITH LINK
  } else {
    addPostwithImgURL(details)
  }
}
