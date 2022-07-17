import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridToolbarContainer } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { MdAdd, MdDelete, MdRemoveRedEye } from 'react-icons/md'
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
    loggedUser,
  } = usePage<RoomsControlPageProps>().props

  const columns: GridColumns<User> = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      flex: 1,
      minWidth: 40,
    },
    {
      field: 'isRoot',
      headerName: 'Admin',
      flex: 1,
      type: 'boolean',
      minWidth: 60,
    },
    {
      field: 'username',
      headerName: 'Nome',
      flex: 3,
      type: 'string',
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 4,
      type: 'string',
      minWidth: 350,
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      valueFormatter: dateTimeGridValueFormatter,
      flex: 3,
      align: 'right',
      headerAlign: 'right',
      minWidth: 160,
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado em',
      valueFormatter: dateTimeGridValueFormatter,
      flex: 3,
      align: 'right',
      headerAlign: 'right',
      minWidth: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      getActions: ({ id }) =>
        loggedUser.id !== id && id !== 1
          ? [
              <GridActionsCellItem
                key='see'
                icon={<MdRemoveRedEye />}
                label='Ver'
                className='textPrimary'
                color='inherit'
                onClick={() => Inertia.visit(`/admin/users/${id}`)}
              />,
              <GridActionsCellItem
                key='delete'
                icon={<MdDelete />}
                label='Delete'
                color='inherit'
                onClick={handleDeleteClick(id)}
              />,
            ]
          : [],
    },
  ]

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
                getRoomsPage(newPage, meta.perPage)
              }
            }}
            onPageSizeChange={pageSize => getRoomsPage(pageSize, meta.currentPage)}
            components={{ Toolbar: UsersGridToolbar }}
            componentsProps={{ toolbar: { onAdd: () => Inertia.visit('/admin/users/create') } }}
            disableSelectionOnClick
          />
        </Stack>
      </Paper>
    </Container>
  )
}

interface UsersGridToolbarProps {
  onAdd: () => void
}

const UsersGridToolbar: FC<UsersGridToolbarProps> = ({ onAdd }) => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <Button startIcon={<MdAdd />} onClick={onAdd}>
      Adicionar Usuário
    </Button>
  </GridToolbarContainer>
)

const handleDeleteClick = (id: GridRowId) => () => {
  Inertia.delete(`/admin/users/${id}`)
}

const getRoomsPage = (page: number, perPage: number) => {
  Inertia.get(`/admin/users?page=${page}&perPage=${perPage}`, undefined, {
    replace: true,
  })
}

export default withDrawer(Index)
