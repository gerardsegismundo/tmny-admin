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
    width: '75vw',
    minHeight: '75vh'
  },
  titleTextfield: {
    display: 'block'
  },
  hashtagsTextfield: {
    display: 'inline-block'
  },
  bodyTextarea: {
    display: 'block',
    width: '100%',
    marginTop: '1rem',
    padding: '.5rem'
  }
}))

export default AddPostModalStyles
