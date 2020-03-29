import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import InboxIcon from '@material-ui/icons/Mail'
import AccountIcon from '@material-ui/icons/AccountCircle'
import PostIcon from '@material-ui/icons/Assignment'

import { useTheme } from '@material-ui/core/styles'
import useNavbarStyles from '../styles/Navbar.styles'

import { connect } from 'react-redux'
import { getMessages } from '../redux/messages/messages.actions'
import { getPosts } from '../redux/posts/posts.actions'
import { logout } from '../redux/auth/auth.actions'
import { withRouter } from 'react-router'

import useOutsideClick from '../hooks/useOutsideClick'

import {
  Badge,
  AppBar,
  Toolbar,
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

const Navbar = ({ getMessages, getPosts, messages, history, logout }) => {
  useEffect(() => {
    getPosts()
    getMessages()
    // eslint-disable-next-line
  }, [])

  const classes = useNavbarStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const bukas = Boolean(anchorEl)

  const handleMenu = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  const changeRoute = route => history.push('/dashboard/' + route)

  // Closing sideNav on outsideClick
  const navListRef = useRef()
  useOutsideClick(navListRef, handleDrawerClose)

  return (
    <div className={classes.root}>
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
            <Tooltip title='Posts'>
              <IconButton
                aria-label='link to posts'
                color='inherit'
                onClick={() => changeRoute('posts')}
              >
                <PostIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Messages'>
              <IconButton
                aria-label='shows unread messages'
                onClick={() => changeRoute('messages')}
                color='inherit'
              >
                <Badge badgeContent={messages.length} color='secondary'>
                  <InboxIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title='Account'>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountIcon />
              </IconButton>
            </Tooltip>

            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={bukas}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
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
        <List ref={navListRef}>
          <ListItem button key={'Posts'} onClick={() => changeRoute('posts')}>
            <ListItemIcon>
              <PostIcon onClick={() => changeRoute('posts')} />
            </ListItemIcon>
            <ListItemText primary={'Posts'} />
          </ListItem>

          <ListItem
            button
            key={'Messages'}
            onClick={() => changeRoute('messages')}
          >
            <ListItemIcon>
              <InboxIcon onClick={() => changeRoute('messages')} />
            </ListItemIcon>
            <ListItemText primary={'Messages'} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  )
}

const mapStateToProps = ({ messages, posts }) => ({
  messages: messages.items,
  posts: posts.items
})

export default withRouter(
  connect(mapStateToProps, { getMessages, getPosts, logout })(Navbar)
)
