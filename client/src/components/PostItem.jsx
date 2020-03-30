import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import usePostItemStyle from '../styles/PostItem.style'

const PostItem = props => {
  const classes = usePostItemStyle()

  return (
    <div className='post-item'>
      <span>{props.title}</span>

      <IconButton className={classes.editIcon} aria-label='edit'>
        <EditIcon fontSize='small' />
      </IconButton>

      <IconButton className={classes.deleteIcon} aria-label='delete'>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </div>
  )
}

export default PostItem
