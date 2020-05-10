import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const DeletePostDialog = ({ isOpen, handleClose, confirmDelete }) => {
  const handleOk = () => {
    confirmDelete()
    handleClose()
  }

  return (
    <Dialog
      // fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle id='responsive-dialog-title'>{'Delete?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} color='primary' autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeletePostDialog
