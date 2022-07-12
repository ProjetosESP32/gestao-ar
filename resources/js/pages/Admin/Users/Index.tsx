import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridToolbarContainer } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { MdAdd, MdDelete } from 'react-icons/md'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Paginate } from '@/interfaces/Paginate'
import { User } from '@/interfaces/User'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'

interface RoomsControlProps {
  users: Paginate<User>
}

type RoomsControlPageProps = BasePageProps<RoomsControlProps>

const Index: FC = () => {
  const {
    users: { data, meta },
  } = usePage<RoomsControlPageProps>().props

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ padding: 2 }}>
        <Stack spacing={2}>
          <Typography variant='h3'>Usuários</Typography>
          <DataGrid
            autoHeight
            rows={data}
            columns={columns}
            pagination
            paginationMode='server'
            page={meta.currentPage - 1}
            pageSize={meta.perPage}
            rowsPerPageOptions={[...new Set([5, 10, 25, meta.perPage])]}
            rowCount={meta.total}
            onPageChange={page => {
              const newPage = page + 1
              if (newPage !== meta.currentPage) {
                Inertia.get(`/admin/users?page=${newPage}&perPage=${meta.perPage}`, undefined, {
                  replace: true,
                  only: ['users'],
                })
              }
            }}
            onPageSizeChange={pageSize =>
              Inertia.get(`/admin/users?page=${meta.currentPage}&perPage=${pageSize}`, undefined, {
                replace: true,
                only: ['users'],
              })
            }
            components={{ Toolbar: UsersGridToolbar }}
            componentsProps={{ toolbar: { onAdd: () => Inertia.visit('/admin/users/create') } }}
            disableSelectionOnClick
            checkboxSelection
          />
        </Stack>
      </Paper>
    </Container>
  )
}

const columns: GridColumns<User> = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    flex: 1,
  },
  {
    field: 'isRoot',
    headerName: 'Admin',
    flex: 1,
    type: 'boolean',
  },
  {
    field: 'username',
    headerName: 'Nome',
    flex: 3,
    type: 'string',
  },
  {
    field: 'email',
    headerName: 'E-mail',
    flex: 4,
    type: 'string',
  },
  {
    field: 'createdAt',
    headerName: 'Criado em',
    valueFormatter: dateTimeGridValueFormatter,
    flex: 3,
    type: 'date',
  },
  {
    field: 'updatedAt',
    headerName: 'Atualizado em',
    valueFormatter: dateTimeGridValueFormatter,
    flex: 3,
    type: 'date',
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Ações',
    width: 100,
    getActions: ({ id }) => [
      <GridActionsCellItem
        key='delete'
        icon={<MdDelete />}
        label='Delete'
        color='inherit'
        onClick={handleDeleteClick(id)}
      />,
    ],
  },
]

interface UsersGridToolbarProps {
  onAdd: () => void
}

const UsersGridToolbar: FC<UsersGridToolbarProps> = ({ onAdd }) => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <Button startIcon={<MdAdd />} onClick={onAdd}>
      Adicionar Sala
    </Button>
  </GridToolbarContainer>
)

const handleDeleteClick = (id: GridRowId) => () => {
  Inertia.delete(`/admin/users/${id}`)
}

export default withDrawer(Index)
