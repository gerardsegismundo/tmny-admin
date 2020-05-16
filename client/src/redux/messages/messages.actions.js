import axios from 'axios'

// Get messages
export const getMessages = () => async dispatch => {
  try {
    const res = await axios.get('/api/messages')

    dispatch({
      type: 'GET_MESSAGES',
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}
