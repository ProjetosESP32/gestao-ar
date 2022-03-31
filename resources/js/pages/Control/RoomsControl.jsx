import { usePage } from '@inertiajs/inertia-react'
import { Grid, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import * as PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MdAddBox, MdDelete, MdFilterList } from 'react-icons/md'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import UserTitle from '../../components/User/Title.jsx'
import { NewRoomModal } from './NewRoomModal'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const RoomsControl = () => {
  const { rooms, loggedUser } = usePage().props
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'))
  const roomCount = rooms.length

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = newValue => {
    setValue(newValue)
  }

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rooms.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (_, name) => {
    const selectedIndex = selected.indexOf(name)
    const newSelected = []

    if (selectedIndex === -1) {
      newSelected.push(...selected, name)
    } else if (selectedIndex === 0) {
      newSelected.push(...selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected.push(...selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected.push(...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  // Evita um salto de layout ao chegar à última página com linhas vazias
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - roomCount) : 0

  return (
    <MiniDrawer>
      <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
        <NewRoomModal isOpen={open} handleClose={handleClose} />
        <Grid item xl={8} md={11}>
          <div style={{ margin: '0.5rem 0' }}>
            <UserTitle variant='p'>Controle de Salas</UserTitle>
          </div>
        </Grid>
        <Grid item xl={8} md={11}>
          <Box sx={{ width: '100%' }}>
            <Item>
              <div style={{ height: 'max-content', width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none' }}>
                  <Toolbar
                    sx={{
                      pl: { sm: 2 },
                      pr: { xs: 1, sm: 1 },
                      ...(selected.length > 0 && {
                        bgcolor: 'rgba(25, 118, 210, 0.12)',
                      }),
                    }}
                  >
                    {selected.length > 0 ? (
                      <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
                        {selected.length} selected
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ flex: '1 1 100%', textAlign: 'left', fontWeight: 'bold' }}
                        variant='h6'
                        id='tableTitle'
                        component='div'
                      >
                        Salas
                      </Typography>
                    )}

                    {selected.length > 0 ? (
                      <Tooltip title='Delete'>
                        <IconButton>
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title='Filter list'>
                        <>
                          <IconButton>
                            <MdFilterList />
                          </IconButton>
                          {loggedUser?.isRoot && (
                            <IconButton onClick={handleOpen}>
                              <MdAddBox />
                            </IconButton>
                          )}
                        </>
                      </Tooltip>
                    )}
                  </Toolbar>

                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={roomCount}
                      />
                      <TableBody>
                        {rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                          const isItemSelected = isSelected(row.id)
                          const labelId = `enhanced-table-checkbox-${index}`

                          return (
                            <TableRow
                              hover
                              onClick={event => handleClick(event, row.id)}
                              role='checkbox'
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isItemSelected}
                            >
                              <TableCell padding='checkbox'>
                                <Checkbox
                                  color='primary'
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                />
                              </TableCell>

                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.block}</TableCell>
                              <TableCell>{row.floor}</TableCell>
                            </TableRow>
                          )
                        })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={roomCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </Item>
          </Box>
        </Grid>
      </Grid>
    </MiniDrawer>
  )
}

const columns = [
  { field: 'name', headerName: 'Nome', minWidth: 130 },
  { field: 'block', headerName: 'Bloco', minWidth: 130 },
  { field: 'floor', headerName: 'Piso', minWidth: 190 },
]

const EnhancedTableHead = ({ onSelectAllClick, numSelected, rowCount }) => (
  <TableHead>
    <TableRow>
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            'aria-label': 'select all desserts',
          }}
        />
      </TableCell>

      {columns.map(headCell => (
        <TableCell key={headCell.field}>{headCell.headerName}</TableCell>
      ))}
    </TableRow>
  </TableHead>
)

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default RoomsControl
