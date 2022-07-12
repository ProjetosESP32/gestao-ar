import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { ChangeEvent, FC, useRef } from 'react'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { FullSteper, FullStepRef, Step } from '@/components/FullStep'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Paginate } from '@/interfaces/Paginate'
import { Room } from '@/interfaces/Room'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'

const steps: Step[] = [
  { label: 'Dados do usuário', isOptional: false },
  { label: 'Vincular salas', isOptional: true },
]

interface RegisterUserFormData {
  username: string
  email: string
  rooms: number[]
  isRoot: boolean
}

interface RegisterUserProps {
  rooms: Paginate<Room>
}

type RoomsControlPageProps = BasePageProps<RegisterUserProps>

const Create: FC = () => {
  const theme = useTheme()
  const {
    rooms: { data: roomData, meta },
  } = usePage<RoomsControlPageProps>().props
  const { data, setData, errors, post, processing, reset } = useForm<RegisterUserFormData>({
    email: '',
    username: '',
    rooms: [],
    isRoot: false,
  })
  const stepperRef = useRef<FullStepRef>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = event.target

    setData({ ...data, [name]: checked })
  }

  const handleReset = () => reset()

  const handleSubmit = async () => {
    await post('/admin/users', { onError: () => stepperRef.current?.reset() })
  }

  return (
    <Container maxWidth='lg'>
      <Paper sx={{ padding: 2 }}>
        <Typography variant='h3'>Criação de usuário</Typography>
        <FullSteper
          ref={stepperRef}
          steps={steps}
          onReset={handleReset}
          onFinish={handleSubmit}
          EndStepperComponent={
            <Grid sx={{ placeItems: 'center' }}>
              {processing ? (
                <Box>
                  <CircularProgress />
                  <Typography textAlign='center'>Enviando formulário</Typography>
                </Box>
              ) : (
                <Typography textAlign='center'>Enviado!</Typography>
              )}
            </Grid>
          }
        >
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item sm={7} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
              <img src='/images/user-register-img.svg' alt='Imagem de registro' style={{ width: '100%' }} />
            </Grid>
            <Grid item sm={5}>
              <Stack spacing={2} alignItems='center'>
                <TextField
                  fullWidth
                  id='username'
                  name='username'
                  label='Nome de usuário'
                  variant='outlined'
                  placeholder='Digite seu nome de usuário'
                  value={data.username}
                  error={!!errors.username}
                  helperText={errors.username}
                  onChange={handleChange}
                  disabled={processing}
                />
                <TextField
                  fullWidth
                  id='email'
                  name='email'
                  label='E-mail'
                  variant='outlined'
                  placeholder='Digite seu e-mail'
                  type='email'
                  value={data.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={handleChange}
                  disabled={processing}
                />
                <FormControl error={!!errors.isRoot} disabled={processing} fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox checked={data.isRoot} onChange={handleCheckboxChange} id='isRoot' name='isRoot' />
                    }
                    label='Administrador'
                  />
                  {!!errors.isRoot && <FormHelperText>{errors.isRoot}</FormHelperText>}
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
          <Stack spacing={2}>
            <Typography>Vincule as salas que esse usuário irá operar.</Typography>
            <Typography variant='caption'>Se o usuário for administrador, pule essa parte.</Typography>
            <DataGrid
              autoHeight
              disableVirtualization
              disableSelectionOnClick
              checkboxSelection
              keepNonExistentRowsSelected
              pagination
              paginationMode='server'
              rows={roomData}
              columns={columns}
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
              onPageSizeChange={pageSize => getRoomsPage(meta.currentPage, pageSize)}
              onSelectionModelChange={selection => setData({ ...data, rooms: selection.map(Number) })}
            />
          </Stack>
        </FullSteper>
      </Paper>
    </Container>
  )
}

const columns: GridColDef[] = [
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
    flex: 2,
  },
  {
    field: 'block',
    headerName: 'Bloco',
    flex: 2,
  },
  {
    field: 'floor',
    headerName: 'Piso',
    flex: 2,
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
]

const getRoomsPage = (page: number, perPage: number) => {
  Inertia.get(`/admin/users/create?page=${page}&perPage=${perPage}`, undefined, {
    only: ['rooms'],
    preserveState: true,
    replace: true,
  })
}

export default withDrawer(Create)
