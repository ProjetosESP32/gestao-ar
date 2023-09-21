import { Cropper } from '@/components/Cropper'
import { withDrawer } from '@/components/Drawer'
import { TabPanel } from '@/components/TabPanel'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'
import { dateTimeGridValueFormatter } from '@/utils/date'
import { getFirstLetters } from '@/utils/string'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage, useRemember } from '@inertiajs/inertia-react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdEdit } from 'react-icons/md'

interface UserProfileFormData {
  username: string
  email: string
  cover: Blob | File | null
}

export const UserProfile: FC = () => {
  const { loggedUser } = usePage<BasePageProps>().props
  const { data, setData, errors, processing, put } = useForm<UserProfileFormData>({
    username: loggedUser!.username,
    email: loggedUser!.email,
    cover: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleCropChange = (blob: Blob) => {
    setData({ ...data, cover: blob })
    const objectUrl = URL.createObjectURL(blob)
    setImagePreview(objectUrl)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    put('/users', {
      onSuccess: () => {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview)
          setImagePreview(null)
        }
      },
    })
  }

  return (
    <Grid component='form' onSubmit={handleSubmit} container spacing={2}>
      <Grid item xs={12} sm={5} md={4}>
        <Paper>
          <Stack p={2} spacing={2} alignItems='center'>
            <Typography variant='h4'>Avatar</Typography>
            <Avatar
              alt={loggedUser!.username}
              src={imagePreview ?? loggedUser!.cover?.url}
              sx={{ width: '7.5rem', height: '7.5rem' }}
            >
              {getFirstLetters(loggedUser!.username)}
            </Avatar>
            {!!errors.cover && <FormHelperText color='error'>{errors.cover}</FormHelperText>}

            <Cropper disabled={processing} onChange={handleCropChange}>
              <Typography variant='h6' textAlign='center'>
                <MdEdit /> Trocar foto
              </Typography>
            </Cropper>
            {loggedUser!.cover && (
              <Button color='error' onClick={() => Inertia.delete('/users/photo')}>
                Deletar foto
              </Button>
            )}
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={7} md={8}>
        <Paper>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Typography padding={2} variant='h4' textAlign='center'>
                Dados Pessoais
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack p={2} spacing={2} alignItems='center'>
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
                <Button fullWidth type='submit' disabled={processing}>
                  Atualizar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <Stack p={2} spacing={2} alignItems='center'>
            <Typography variant='h4'>Contas Vinculadas</Typography>
            <Stack direction='row'>
              {loggedUser!.isGoogleLinked ? (
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <FcGoogle size={32} />
                  <Typography variant='body1' textAlign='center'>
                    Vinculada
                  </Typography>
                </Box>
              ) : (
                <a href='/users/link-google' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FcGoogle size={32} />
                  <Typography variant='body1' textAlign='center' color='primary'>
                    Vincular
                  </Typography>
                </a>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

interface ProfilePasswordFormData {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export const ProfilePassword: FC = () => {
  const theme = useTheme()
  const { data, setData, errors, processing, patch, reset } = useForm<ProfilePasswordFormData>({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    patch('/users/password', {
      onSuccess: () => reset(),
    })
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item sm={12} md={7} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
          <img
            src='/images/loggedUser-resetpass-img.svg'
            alt='Imagem de atualização de senha'
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Stack component='form' spacing={2} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id='oldPassword'
              name='oldPassword'
              label='Senha atual'
              variant='outlined'
              placeholder='Digite sua senha atual'
              type='password'
              value={data.oldPassword}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
              onChange={handleChange}
              disabled={processing}
            />
            <TextField
              fullWidth
              id='newPassword'
              name='newPassword'
              label='Nova senha'
              variant='outlined'
              placeholder='Digite a nova senha'
              type='password'
              value={data.newPassword}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              onChange={handleChange}
              disabled={processing}
            />
            <TextField
              fullWidth
              id='newPasswordConfirmation'
              name='newPasswordConfirmation'
              label='Confirme sua nova senha'
              variant='outlined'
              placeholder='Digite a confirmação da nova senha'
              type='password'
              value={data.newPasswordConfirmation}
              error={!!errors.newPasswordConfirmation}
              helperText={errors.newPasswordConfirmation}
              onChange={handleChange}
              disabled={processing}
            />
            <Button type='submit' fullWidth disabled={processing}>
              Atualizar senha
            </Button>
          </Stack>
        </Grid>
      </Grid>
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

const Profile: FC = () => {
  const [tabState, setTabState] = useRemember(0, 'tabPanel')

  const handleChangeTab = (_: unknown, tabPage: number) => {
    setTabState(tabPage)
  }

  return (
    <Container maxWidth='lg'>
      <Typography variant='h2'>Conta</Typography>
      <Tabs value={tabState} onChange={handleChangeTab}>
        <Tab label='Você' />
        <Tab label='Segurança' />
        <Tab label='Salas' />
      </Tabs>
      <TabPanel panelNumber={0} selectedPanel={tabState} preRender>
        <UserProfile />
      </TabPanel>
      <TabPanel panelNumber={1} selectedPanel={tabState} preRender>
        <ProfilePassword />
      </TabPanel>
      <TabPanel panelNumber={2} selectedPanel={tabState}>
        <ProfileRooms />
      </TabPanel>
    </Container>
  )
}

export default withDrawer(Profile)
