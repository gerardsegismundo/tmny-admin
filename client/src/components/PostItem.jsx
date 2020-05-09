import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Tooltip } from '@material-ui/core'
import usePostItemStyle from '../styles/PostItem.style'

const PostItem = ({ title, _id, handleDelete }) => {
  const classes = usePostItemStyle()

  const onEdit = () => {
    console.log('EDIT', _id)
  }

  const onDelete = () => handleDelete(_id)

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
        <IconButton className={classes.deleteIcon} onClick={onDelete}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default PostItem
