import { withDrawer } from '@/components/Drawer'
import { BasePageProps } from '@/interfaces/BasePageProps'
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
import TextField from '@mui/material/TextField'
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
import React, { FC, useMemo, useState } from 'react'
import { MdAdd, MdCancel, MdDelete, MdEdit, MdHelpOutline, MdRemoveRedEye, MdSave } from 'react-icons/md'

interface NewRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewRoomModal: FC<NewRoomModalProps> = ({ isOpen, onClose }) => {
  const { data, post, processing, setData, errors, reset } = useForm({
    name: '',
    block: '',
    floor: '',
  })

  const handleClose = () => {
    if (processing) return

    onClose()
    reset()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    post('/admin/rooms', { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='xs'>
        <Paper>
          <Stack component='form' onSubmit={handleSubmit} spacing={2} p={2}>
            <Typography variant='h6'>Criar sala</Typography>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Sala'
              variant='outlined'
              placeholder='Digite o nome da sala'
              value={data.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              disabled={processing}
            />
            <TextField
              fullWidth
              id='block'
              name='block'
              label='Bloco'
              variant='outlined'
              placeholder='Digite o bloco da sala'
              value={data.block}
              error={!!errors.block}
              helperText={errors.block}
              onChange={handleChange}
              disabled={processing}
            />
            <TextField
              fullWidth
              id='floor'
              name='floor'
              label='Piso'
              variant='outlined'
              placeholder='Digite o piso da sala'
              value={data.floor}
              error={!!errors.floor}
              helperText={errors.floor}
              onChange={handleChange}
              disabled={processing}
            />
            <Button fullWidth type='submit' disabled={processing}>
              Criar sala
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}

interface RoomGridToolbarProps {
  onAdd: () => void
  isRoot?: boolean
}

const RoomGridToolbar: FC<RoomGridToolbarProps> = ({ onAdd, isRoot }) => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    {isRoot && (
      <>
        <Button startIcon={<MdAdd />} onClick={onAdd}>
          Adicionar Sala
        </Button>
        <Tooltip title='Para atualizar, clique no botão de caneta nas ações da tabela. Dessa forma, você consegue alterar diretamente na tabela.'>
          <IconButton>
            <MdHelpOutline />
          </IconButton>
        </Tooltip>
      </>
    )}
  </GridToolbarContainer>
)

const handleRowEditStart: GridEventListener<'rowEditStart'> = (_, event) => {
  event.defaultMuiPrevented = true
}

const handleRowEditStop: GridEventListener<'rowEditStop'> = (_, event) => {
  event.defaultMuiPrevented = true
}

const handleDeleteClick = (id: GridRowId) => () => {
  Inertia.delete(`/admin/rooms/${id}`)
}

const getPaginatedRoom = (page: number, perPage: number) => {
  Inertia.get(`/rooms?page=${page}&perPage=${perPage}`, undefined, {
    replace: true,
  })
}

const processRowUpdate = (row: Room) => {
  Inertia.put(`/admin/rooms/${row.id}`, row as any, { replace: true })
  return row
}

interface RoomsControlProps {
  rooms: Paginate<Room>
}

type RoomsControlPageProps = BasePageProps<RoomsControlProps>

const Index: FC = () => {
  const {
    rooms: { data, meta },
    loggedUser,
  } = usePage<RoomsControlPageProps>().props
  const [isOpen, setIsOpen] = useState(false)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  const columns: GridColumns<Room> = useMemo(
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
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Ações',
        width: 100,
        getActions: ({ id }) => {
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

          const actionButtons = [
            <GridActionsCellItem
              key='see'
              icon={<MdRemoveRedEye />}
              label='Ver'
              className='textPrimary'
              color='inherit'
              onClick={() => Inertia.visit(`/rooms/control/${id}`)}
            />,
          ]

          if (loggedUser?.isRoot) {
            actionButtons.push(
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
                key='delete'
                icon={<MdDelete />}
                label='Delete'
                color='inherit'
                onClick={handleDeleteClick(id)}
              />,
            )
          }

          return actionButtons
        },
      },
    ],
    [loggedUser?.isRoot, rowModesModel],
  )

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ padding: 2 }}>
        <Stack spacing={2}>
          <Typography variant='h3'>Salas</Typography>
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
            isCellEditable={params => Boolean(params.colDef.editable && loggedUser?.isRoot)}
            components={{ Toolbar: RoomGridToolbar }}
            componentsProps={{ toolbar: { onAdd: handleOpenModal, isRoot: loggedUser?.isRoot } }}
            rowModesModel={rowModesModel}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
          />
        </Stack>
      </Paper>
      <NewRoomModal isOpen={isOpen} onClose={handleCloseModal} />
    </Container>
  )
}

export default withDrawer(Index)
