import { AutocompleteRoom } from '@/components/AutocompleteRoom'
import { withDrawer } from '@/components/Drawer'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Esp } from '@/interfaces/Esp'
import { Paginate } from '@/interfaces/Paginate'
import { Room } from '@/interfaces/Room'
import { dateTimeGridValueFormatter } from '@/utils/date'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
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
import React, { FC, FormEvent, useMemo, useState } from 'react'
import { MdAddLink, MdCancel, MdDelete, MdEdit, MdHelpOutline, MdSave } from 'react-icons/md'

interface EspModalProps {
  isOpen: boolean
  espId: number
  espName: string
  onClose: () => void
}

export const EspModal: FC<EspModalProps> = ({ espId, espName, isOpen, onClose }) => {
  const { put, processing, setData, reset } = useForm({ roomId: 0 })

  const handleChange = (room: Room) => {
    setData({ roomId: room.id })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    put(`/admin/esps/${espId}`, { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='xs'>
        <Paper>
          <Stack component='form' onSubmit={handleSubmit} spacing={2} p={2}>
            <Typography variant='h6'>Vincular sala a {espName}</Typography>
            <AutocompleteRoom onChange={handleChange} disabled={processing} />
            <Button fullWidth type='submit' disabled={processing}>
              Vincular
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
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

  const columns: GridColumns<Esp> = useMemo(
    () => [
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
              <GridActionsCellItem
                key='save'
                icon={<MdSave />}
                label='Save'
                onClick={() => {
                  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
                }}
              />,
              <GridActionsCellItem
                key='cancel'
                icon={<MdCancel />}
                label='Cancel'
                className='textPrimary'
                onClick={() => {
                  setRowModesModel({
                    ...rowModesModel,
                    [id]: { mode: GridRowModes.View, ignoreModifications: true },
                  })
                }}
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
              onClick={() => {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
              }}
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
    ],
    [rowModesModel],
  )

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

export default withDrawer(Index)
