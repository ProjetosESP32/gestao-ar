import { usePage } from '@inertiajs/inertia-react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { FC } from 'react'
import { BasePageProps } from '../interfaces/BasePageProps'
import { Room } from '../interfaces/Room'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'

interface ProfileRoomsPage {
  rooms: Room[]
}

type ProfileRoomsProps = BasePageProps<ProfileRoomsPage>

export const ProfileRooms: FC = () => {
  const { loggedUser } = usePage<ProfileRoomsProps>().props

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h4'>Suas salas</Typography>
        <DataGrid
          autoHeight
          pagination
          rows={loggedUser!.rooms ?? []}
          columns={columns}
          rowCount={loggedUser!.rooms?.length ?? 0}
          disableSelectionOnClick
        />
      </Stack>
    </Paper>
  )
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    align: 'right',
    type: 'number',
    flex: 1,
    minWidth: 60,
  },
  {
    field: 'name',
    headerName: 'Nome',
    flex: 3,
    editable: true,
    minWidth: 200,
  },
  {
    field: 'block',
    headerName: 'Bloco',
    flex: 1,
    editable: true,
    minWidth: 100,
  },
  {
    field: 'floor',
    headerName: 'Piso',
    flex: 1,
    editable: true,
    minWidth: 50,
  },
  {
    field: 'createdAt',
    headerName: 'Criada em',
    valueFormatter: dateTimeGridValueFormatter,
    align: 'right',
    headerAlign: 'right',
    flex: 4,
    minWidth: 160,
  },
  {
    field: 'updatedAt',
    headerName: 'Atualizada em',
    valueFormatter: dateTimeGridValueFormatter,
    align: 'right',
    headerAlign: 'right',
    flex: 4,
    minWidth: 160,
  },
]
