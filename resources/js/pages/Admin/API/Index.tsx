import { withDrawer } from '@/components/Drawer'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Paginate } from '@/interfaces/Paginate'
import { ServiceApiKey } from '@/interfaces/ServiceApiKey'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'
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
import React, { FC, useState } from 'react'
import { MdAdd, MdCancel, MdDelete, MdEdit, MdHelpOutline, MdSave } from 'react-icons/md'

interface NewServiceApiModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewServiceApiModal: FC<NewServiceApiModalProps> = ({ isOpen, onClose }) => {
  const { data, post, processing, setData, errors, reset } = useForm({
    name: '',
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

    post('/admin/apis', { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='xs'>
        <Paper>
          <Stack component='form' onSubmit={handleSubmit} spacing={2} p={2}>
            <Typography variant='h6'>Criar chave de API</Typography>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Nome'
              variant='outlined'
              placeholder='Digite o nome da chave de API'
              value={data.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              disabled={processing}
            />
            <Button fullWidth type='submit' disabled={processing}>
              Criar Chave
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}

interface ServiceApiGridToolbarProps {
  onAdd: () => void
}

const ServiceApiGridToolbar: FC<ServiceApiGridToolbarProps> = ({ onAdd }) => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <Button startIcon={<MdAdd />} onClick={onAdd}>
      Adicionar API
    </Button>
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
  Inertia.delete(`/admin/apis/${id}`)
}

const getPaginatedServices = (page: number, perPage: number) => {
  Inertia.get(`/admin/apis?page=${page}&perPage=${perPage}`, undefined, {
    replace: true,
  })
}

const processRowUpdate = (row: ServiceApiKey) => {
  Inertia.put(`/admin/apis/${row.id}`, row as any, { replace: true })
  return row
}

interface RoomsControlProps {
  services: Paginate<ServiceApiKey>
}

type RoomsControlPageProps = BasePageProps<RoomsControlProps>

const Index: FC = () => {
  const {
    services: { data, meta },
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

  const columns: GridColumns<ServiceApiKey> = [
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
      minWidth: 150,
    },
    {
      field: 'token',
      headerName: 'Token',
      flex: 6,
      minWidth: 420,
    },
    {
      field: 'createdAt',
      headerName: 'Criada em',
      valueFormatter: dateTimeGridValueFormatter,
      align: 'right',
      headerAlign: 'right',
      flex: 3,
      minWidth: 160,
    },
    {
      field: 'updatedAt',
      headerName: 'Atualizada em',
      valueFormatter: dateTimeGridValueFormatter,
      align: 'right',
      headerAlign: 'right',
      flex: 3,
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
          <Typography variant='h3'>API&apos;s</Typography>
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
                getPaginatedServices(newPage, meta.perPage)
              }
            }}
            onPageSizeChange={pageSize => getPaginatedServices(meta.currentPage, pageSize)}
            processRowUpdate={processRowUpdate}
            isCellEditable={params => !!params.colDef.editable}
            components={{ Toolbar: ServiceApiGridToolbar }}
            componentsProps={{ toolbar: { onAdd: handleOpenModal } }}
            rowModesModel={rowModesModel}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
          />
          <NewServiceApiModal isOpen={isOpen} onClose={handleCloseModal} />
        </Stack>
      </Paper>
    </Container>
  )
}

export default withDrawer(Index)
