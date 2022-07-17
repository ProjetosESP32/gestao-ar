import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer,
} from '@mui/x-data-grid'
import React, { FC, useState } from 'react'
import { MdAddLink, MdCancel, MdDelete, MdEdit, MdHelpOutline, MdSave } from 'react-icons/md'
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
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const isOpen = !!espData

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })
  }

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
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem key='save' icon={<MdSave />} label='Save' onClick={handleSaveClick(id)} />,
            <GridActionsCellItem
              key='cancel'
              icon={<MdCancel />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ]
        }

        return [
          <GridActionsCellItem
            key='edit'
            icon={<MdEdit />}
            label='Edit'
            className='textPrimary'
            color='inherit'
            onClick={handleEditClick(id)}
          />,
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
        ]
      },
    },
  ]

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ padding: 2 }}>
        <Stack spacing={2}>
          <Typography variant='h3'>Esps</Typography>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            autoHeight
            pagination
            paginationMode='server'
            editMode='row'
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
            processRowUpdate={processRowUpdate}
            isCellEditable={params => Boolean(params.colDef.editable)}
            components={{ Toolbar: EspGridToolbar }}
            rowModesModel={rowModesModel}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
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

const handleRowEditStart: GridEventListener<'rowEditStart'> = (_, event) => {
  event.defaultMuiPrevented = true
}

const handleRowEditStop: GridEventListener<'rowEditStop'> = (_, event) => {
  event.defaultMuiPrevented = true
}

const handleDeleteClick = (id: GridRowId) => () => {
  Inertia.delete(`/admin/esps/${id}`)
}

const getPaginatedRoom = (page: number, perPage: number) => {
  Inertia.get(`/admin/esps?page=${page}&perPage=${perPage}`, undefined, {
    replace: true,
  })
}

const processRowUpdate = (row: Esp) => {
  Inertia.put(`/admin/esps/${row.id}`, row as any, { replace: true })
  return row
}

export default withDrawer(Index)
