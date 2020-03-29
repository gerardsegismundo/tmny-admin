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
