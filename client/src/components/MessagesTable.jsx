import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer } from '@material-ui/core/'
import { TablePagination, TableFooter, Paper } from '@material-ui/core/'
import { TableRow } from '@material-ui/core/'

import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons/'

import { connect } from 'react-redux'
import { sliceMessage, formatDate } from '../utils/'

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}))

const TablePaginationActions = props => {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = e => onChangePage(e, 0)

  const handleBackButtonClick = e => onChangePage(e, page - 1)

  const handleNextButtonClick = e => onChangePage(e, page + 1)

  const handleLastPageButtonClick = e =>
    onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500
  }
})

const MessagesTable = ({ messages }) => {
  console.log(messages)

  const classes = useStyles2()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, messages.length - page * rowsPerPage)

  const handleChangePage = (e, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return messages ? (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableBody>
          {(rowsPerPage > 0
            ? messages.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : messages
          ).map(m => (
            <TableRow key={m._id}>
              <TableCell style={{ maxWidth: '25%' }} component='th' scope='row'>
                {m.name}
              </TableCell>
              <TableCell>
                {m.title} - <span>{sliceMessage(m.body)}</span>
              </TableCell>
              <TableCell style={{ maxWidth: '15%' }}>
                {formatDate(m.date)}
              </TableCell>
            </TableRow>
          ))}

          {/*       {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={messages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : null
}

const mapStateToProps = ({ messages }) => ({
  messages: messages.items
})

export default connect(mapStateToProps)(MessagesTable)
