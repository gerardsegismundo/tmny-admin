import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useNavbarStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

    backgroundImage: `linear-gradient(
      45deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 83, 121, 1) 35%,
      rgb(0, 143, 255) 100%
    );`
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  hide: {
    display: 'none'
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },

  drawerPaper: {
    backgroundColor: ' #e4e4e4',
    width: drawerWidth
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },

  icons: {
    position: 'absolute',
    right: '1rem'
  }
}))

export default useNavbarStyles
