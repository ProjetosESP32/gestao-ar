import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridToolbarContainer } from '@mui/x-data-grid'
import React, { FC, useState } from 'react'
import { MdAddLink, MdDelete, MdHelpOutline } from 'react-icons/md'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { EspModal } from '@/components/EspModal'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Esp } from '@/interfaces/Esp'
import { Paginate } from '@/interfaces/Paginate'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'

interface EspsProps {
  esps: Paginate<Esp>
}

type EspsPageProps = BasePageProps<EspsProps>

const Index: FC = () => {
  const {
    esps: { data, meta },
  } = usePage<EspsPageProps>().props
  const [espData, setEspData] = useState<Pick<Esp, 'id' | 'name'>>()
  const isOpen = !!espData

  const columns: GridColumns<Esp> = [
    {
      field: 'id',
      headerName: 'ID',
      align: 'right',
      type: 'number',
      flex: 1,
      minWidth: 40,
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 2,
      editable: true,
      minWidth: 160,
    },
    {
      field: 'macAddress',
      headerName: 'Endereço MAC',
      flex: 3,
      minWidth: 180,
    },
    {
      field: 'roomName',
      headerName: 'Sala',
      flex: 1,
      minWidth: 160,
      valueGetter: ({ row }) => row.room?.name,
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      valueFormatter: dateTimeGridValueFormatter,
      align: 'right',
      headerAlign: 'right',
      flex: 4,
      minWidth: 160,
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizado em',
      valueFormatter: dateTimeGridValueFormatter,
      align: 'right',
      headerAlign: 'right',
      flex: 4,
      minWidth: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          key='see'
          icon={<MdAddLink />}
          label='Ver'
          className='textPrimary'
          color='inherit'
          onClick={() => setEspData({ id: row.id, name: row.name })}
        />,
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

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ padding: 2 }}>
        <Stack spacing={2}>
          <Typography variant='h3'>Esps</Typography>
          <DataGrid
            autoHeight
            pagination
            paginationMode='server'
            disableSelectionOnClick
            rows={data}
            columns={columns}
            page={meta.currentPage - 1}
            pageSize={meta.perPage}
            rowsPerPageOptions={[...new Set([5, 10, 25, meta.perPage])]}
            rowCount={meta.total}
            onPageChange={page => {
              const newPage = page + 1
              if (newPage !== meta.currentPage) {
                getPaginatedRoom(newPage, meta.perPage)
              }
            }}
            onPageSizeChange={pageSize => getPaginatedRoom(meta.currentPage, pageSize)}
            isCellEditable={params => !!params.colDef.editable}
            components={{ Toolbar: EspGridToolbar }}
          />
        </Stack>
      </Paper>
      <EspModal
        isOpen={isOpen}
        espId={espData?.id ?? 0}
        espName={espData?.name ?? ''}
        onClose={() => setEspData(undefined)}
      />
    </Container>
  )
}

const EspGridToolbar: FC = () => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <Tooltip title='Para atualizar, clique no botão de caneta nas ações da tabela. Dessa forma, você consegue alterar diretamente na tabela.'>
      <IconButton>
        <MdHelpOutline />
      </IconButton>
    </Tooltip>
  </GridToolbarContainer>
)

const handleDeleteClick = (id: GridRowId) => () => {
  Inertia.delete(`/admin/esps/${id}`)
}

const getPaginatedRoom = (page: number, perPage: number) => {
  Inertia.get(`/admin/esps?page=${page}&perPage=${perPage}`, undefined, {
    replace: true,
    only: ['esps'],
  })
}

export default withDrawer(Index)
