import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Tooltip } from '@material-ui/core'
import usePostItemStyle from '../styles/PostItem.style'

const PostItem = ({ title, _id, handleDelete, handleEdit, handleView }) => {
  const classes = usePostItemStyle()

  const onView = () => {
    handleView(_id)
  }

  const onEdit = e => {
    e.stopPropagation()
    handleEdit(_id)
  }

  const onDelete = e => {
    e.stopPropagation()
    handleDelete(_id)
  }

  return (
    <div className='post-item' onClick={onView}>
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
