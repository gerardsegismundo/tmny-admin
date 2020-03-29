import { makeStyles } from '@material-ui/core/styles'

const usePostStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default usePostStyles
