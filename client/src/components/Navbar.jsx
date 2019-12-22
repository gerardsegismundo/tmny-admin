import React, { useEffect } from 'react'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'

import AccountCircle from '@material-ui/icons/AccountCircle'

import useNavbarStyles from './styles/Navbar.styles'
import { useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { getMessages } from '../redux/messages/messages.actions'

import {
  Badge,
  AppBar,
  Toolbar,
  CssBaseline,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@material-ui/core'

const Navbar = ({ getMessages, messages }) => {
  useEffect(() => {
    getMessages()

    // eslint-disable-next-line
  }, [])

  const classes = useNavbarStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  // eslint-disable-next-line
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleDrawerOpen = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Admin Dashboard
          </Typography>

          <div className={classes.icons}>
            <Tooltip title='Messages'>
              <IconButton aria-label='show unread messages' color='inherit'>
                <Badge badgeContent={messages.length} color='secondary'>
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title='Notifications'>
              <IconButton aria-label='shows notifications' color='inherit'>
                <Badge badgeContent={17} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title='Profile'>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls='primary-search-account-menu'
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> :}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}

          <ListItem button key={'tae'}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'tae'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

const mapStateToProps = ({ inbox }) => ({
  messages: inbox.messages
})

export default connect(mapStateToProps, { getMessages })(Navbar)
