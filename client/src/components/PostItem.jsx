import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Tooltip } from '@material-ui/core'
import usePostItemStyle from '../styles/PostItem.style'

const PostItem = ({ title, _id }) => {
  const classes = usePostItemStyle()

  const onEdit = () => {
    console.log('EDIT', _id)
  }

  return (
    <div className='post-item'>
      <span>{title}</span>

      <Tooltip title='Edit'>
        <IconButton
          onClick={onEdit}
          className={classes.editIcon}
          aria-label='edit'
        >
          <EditIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title='Delete'>
        <IconButton className={classes.deleteIcon} aria-label='delete'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default PostItem
