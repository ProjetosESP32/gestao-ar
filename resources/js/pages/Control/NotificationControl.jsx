import { Grid, Button } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useTheme, styled } from '@mui/material/styles'
import React from 'react'
import UserTitle from '../../components/User/Title.jsx'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { MdNotificationAdd, MdDelete, MdFilterList } from 'react-icons/md'
import { IconButton } from '@mui/material'
import { ControlInput, ControlLabel, ControlTextArea, ControlSelect } from '../../components/User/TextField.jsx'
import { AccountButton } from '../../components/User/Buttons'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const NotificationControl = () => {
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'))

  const handleChange = newValue => {
    setValue(newValue)
  }

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <MiniDrawer>
      <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={Modalstyle}>
            <UserTitle style={{ margin: '1.5rem 0' }} variant='p'>
              Notificação
            </UserTitle>

            <Grid container justifyContent={'space-between'} columns={11} alignItems={'center'}>
              <Grid item xs={11}>
                <ControlLabel>Título</ControlLabel>
                <ControlInput />
              </Grid>
              <Grid item xs={11}>
                <ControlLabel>Descrição</ControlLabel>
                <ControlTextArea />
              </Grid>
              <Grid item xs={11}>
                <ControlLabel>Alvos</ControlLabel>
                <ControlSelect>
                  <option>Olá mundo</option>
                </ControlSelect>
              </Grid>
              <Grid item xs={5}>
                <ControlLabel>Título</ControlLabel>
                <ControlSelect>
                  <option>Olá mundo</option>
                </ControlSelect>
              </Grid>
              <Grid item xs={5}>
                <ControlLabel>Título</ControlLabel>
                <ControlInput type='date' />
              </Grid>
              <Grid item xs={11}>
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                  <AccountButton>Salvar</AccountButton>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Grid item xl={8} md={11}>
          <div style={{ margin: '0.5rem 0' }}>
            <UserTitle variant='p'>Gerir Notificações</UserTitle>
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
                        sx={{ flex: '1 1 100%', textAlign: 'left' }}
                        variant='h6'
                        id='tableTitle'
                        component='div'
                      >
                        Notificações
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
                          <IconButton onClick={handleOpen}>
                            <MdNotificationAdd />
                          </IconButton>
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
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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

                              <TableCell>{row.title}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell>{row.obs}</TableCell>
                              <TableCell>{row.date}</TableCell>
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
                  count={rows.length}
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

const Modalstyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  // backgroundColor: 'rgba(0,0,0,0)',
  borderRadius: '0.5rem',
}

/*table data */

const columns = [
  { field: 'title', headerName: 'Título', minWidth: 130 },
  { field: 'type', headerName: 'Tipo', minWidth: 130 },
  { field: 'obs', headerName: 'Observações', minWidth: 190 },
  { field: 'date', headerName: 'Data', minWidth: 190 },
]

const rows = [
  { id: 1, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 2, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 3, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 4, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 5, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 6, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 7, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 8, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 9, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
  { id: 10, title: 'Título da notificação', type: 'genérico', obs: 'texto genérico', date: '13/agosto/2021 as 13:00h' },
]

const EnhancedTableHead = props => {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
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
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,

  rowCount: PropTypes.number.isRequired,
}

export default NotificationControl
