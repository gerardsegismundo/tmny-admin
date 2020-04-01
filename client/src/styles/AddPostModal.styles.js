import { makeStyles } from '@material-ui/core/styles'

const AddPostModalStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '60vw',
    minHeight: '75vh'
  },

  heading: {
    marginTop: '2rem',
    marginBottom: '1.5rem',
    color: `rgba(46, 46, 46, 0.8)`,
    fontSize: '2.5rem',
    fontFamily: `'Shadows Into Light', cursive`
  },

  form: {
    width: '95%',
    margin: 'auto'
  },

  titleTextfield: {
    width: '100%',
    marginBottom: '1rem'
  },

  bodyTextarea: {
    display: 'block',
    width: '100%',
    marginTop: '1rem',
    padding: '.5rem',
    minHeight: '20rem'
  },

  hashtagChips: {
    marginRight: '.5rem'
  },

  submitBtn: {
    marginTop: '2rem',
    width: '8rem',
    float: 'right'
  }
}))

export default AddPostModalStyles
