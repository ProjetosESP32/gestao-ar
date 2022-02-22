import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Button, Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import UserTitle from '../../components/User/Title.jsx'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const StyledButton = styled(Button)({
  width: 'max-content',
  padding: '0.5rem 1rem',
  borderRadius: 8,
  color: '#5D99C6',
  boxShadow: '0px 3px 6px #00000029',
  backgroundColor: '#F7F7F7',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
  fontWeight: 'bold',
})

const UserList = () => {
  const { users } = usePage().props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <MiniDrawer>
      <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
        <Grid item xl={8} md={11}>
          <div style={{ margin: '0.5rem 0' }}>
            <UserTitle variant='p'>Cadastro de usuário</UserTitle>
          </div>
        </Grid>
        <Grid item xl={8} md={11}>
          <Item>
            <div style={{ display: 'flex', margin: '0.3rem auto' }}>
              <UserTitle variant='p'>Usuários Cadastrados</UserTitle>
              <StyledButton onClick={() => Inertia.visit('/admin/users/create')}>+ Usuário</StyledButton>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: '0.5rem' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columnConfiguration.map(column => (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columnConfiguration.map(column => {
                          const value = row[column.id]
                          return (
                            <TableCell key={`${column.id}_${row.id}-${row.email}`} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage={'Linhas por página'}
                rowsPerPageOptions={[5, 10, 15]}
                component='div'
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Item>
        </Grid>
      </Grid>
    </MiniDrawer>
  )
}

const columnConfiguration = [
  { id: 'username', label: 'Nome', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 100 },
  {
    id: 'is_root',
    label: 'Administrador',
    minWidth: 170,
    align: 'right',
  },
]

export default UserList
