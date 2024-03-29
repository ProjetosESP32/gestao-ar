import { withDrawer } from '@/components/Drawer'
import { FullStepRef, FullSteper, StepData } from '@/components/FullStep'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Paginate } from '@/interfaces/Paginate'
import { Room } from '@/interfaces/Room'
import { dateTimeGridValueFormatter } from '@/utils/date'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { ChangeEvent, FC, useRef } from 'react'

const steps: StepData[] = [
  { label: 'Dados do usuário', isOptional: false },
  { label: 'Vincular salas', isOptional: true },
]

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
    flex: 2,
    minWidth: 200,
  },
  {
    field: 'block',
    headerName: 'Bloco',
    flex: 2,
    minWidth: 100,
  },
  {
    field: 'floor',
    headerName: 'Piso',
    flex: 2,
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

const getRoomsPage = (page: number, perPage: number) => {
  Inertia.get(`/admin/users/create?page=${page}&perPage=${perPage}`, undefined, {
    preserveState: true,
    replace: true,
  })
}

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

  const handleSubmit = () => {
    post('/admin/users', { onError: () => stepperRef.current?.reset() })
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
            <Box display='flex' alignItems='center' justifyContent='center'>
              {processing ? (
                <>
                  <CircularProgress />
                  <Typography textAlign='center'>Enviando formulário</Typography>
                </>
              ) : (
                <Typography textAlign='center'>Enviado!</Typography>
              )}
            </Box>
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

export default withDrawer(Create)
