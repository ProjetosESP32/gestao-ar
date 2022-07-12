import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
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
import { MdAdd, MdCancel, MdDelete, MdEdit, MdHelpOutline, MdRemoveRedEye, MdSave } from 'react-icons/md'
import { withDrawer } from '@/components/Drawer/withDrawer'
import NewRoomModal from '@/components/NewRoomModal'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Paginate } from '@/interfaces/Paginate'
import { Room } from '@/interfaces/Room'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'

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

  const columns: GridColumns<Room> = [
    {
      field: 'id',
      headerName: 'ID',
      align: 'right',
      type: 'number',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 3,
      editable: true,
    },
    {
      field: 'block',
      headerName: 'Bloco',
      flex: 1,
      editable: true,
    },
    {
      field: 'floor',
      headerName: 'Piso',
      flex: 1,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Criada em',
      valueFormatter: dateTimeGridValueFormatter,
      align: 'right',
      headerAlign: 'right',
      flex: 4,
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizada em',
      valueFormatter: dateTimeGridValueFormatter,
      align: 'right',
      headerAlign: 'right',
      flex: 4,
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
              onClick={handleEditClick(id)}
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
  ]

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
    only: ['rooms'],
  })
}

const processRowUpdate = (row: Room) => {
  Inertia.put(`/admin/rooms/${row.id}`, row as any, { replace: true, only: ['rooms'] })
  return row
}

export default withDrawer(Index)
