import { makeStyles } from '@material-ui/core/styles'

const PostModalStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: '60rem',
    minHeight: '75vh',
    maxHeight: '90vh',
    overflow: 'auto'
  },

  heading: {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: `rgba(46, 46, 46, 0.8)`,
    fontSize: '2.5rem',
    fontFamily: `'Shadows Into Light', cursive`
  },

  form: {
    width: '90%',
    margin: 'auto'
  },

  titleTextfield: {
    width: '100%',
    marginBottom: '.75rem'
  },

  bodyTextarea: {
    display: 'block',
    width: '100%',
    marginTop: '1.5rem',
    padding: '.5rem',
    minHeight: '15rem',
    overFlow: 'auto'
  },

  hashtagsContainer: {
    maxWidth: '50rem',
    marginBottom: '1rem',
    marginTop: '1.5rem'
  },

  hashtagsLabel: {
    marginRight: '1rem',
    opacity: '.8'
  },

  hashtagChips: {
    marginRight: '.75rem',
    marginBottom: '.75rem'
  },

  submitBtn: {
    marginTop: '2rem',
    width: '8rem',
    float: 'right'
  },

  uploadImageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    height: '3rem'
  },

  uploadImage: {
    marginRight: '1rem',
    display: 'flex'
  },

  uploadImageInfo: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2rem'
  },

  imgURLTextfield: {
    width: '100%'
  },

  cancelIcon: {
    marginLeft: '1rem',
    cursor: 'pointer'
  }
}))

export default PostModalStyles
