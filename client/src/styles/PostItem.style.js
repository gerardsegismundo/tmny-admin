import { makeStyles } from '@material-ui/core/styles'

const usePostItemStyle = makeStyles(theme => ({
  editIcon: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      color: '#212121'
    }
  },

  deleteIcon: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      color: '#212121'
    }
  }
}))

export default usePostItemStyle
