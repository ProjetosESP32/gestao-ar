import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId } from '@mui/x-data-grid'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { UserRoomModal } from '@/components/UserRoomModal'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'
import { User } from '@/interfaces/User'
import { dateTimeGridValueFormatter } from '@/utils/dateTimeGridValueFormatter'
import { getFirstLetters } from '@/utils/getFirstLetters'

interface ShowUserPage {
  user: User
}

type ShowUserPageProps = BasePageProps<ShowUserPage>

interface UserShowFormData extends Pick<User, 'username' | 'email' | 'isRoot'> {
  roomIds: number[]
}

const Show: FC = () => {
  const { user } = usePage<ShowUserPageProps>().props
  const { data, setData, errors, put, processing } = useForm<UserShowFormData>({
    username: user.username,
    email: user.email,
    isRoot: !!user.isRoot,
    roomIds: [],
  })
  const [isOpen, setIsOpen] = useState(false)
  const [roomsToLink, setRoomsToLink] = useState<Room[]>([])
  const isNotRoot = !data.isRoot

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = event.target

    setData({ ...data, [name]: checked })
  }

  const handleLink = (room: Room) => {
    setRoomsToLink([...roomsToLink, room])
    setData({ ...data, roomIds: [...data.roomIds, room.id] })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    put(`/admin/users/${user.id}`)
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    Inertia.delete(`/admin/users/${user.id}/detach-room/${id}`)
  }

  const columns: GridColumns<Room> = [
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
      getActions: ({ id }) => [
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
      <UserRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} onLink={handleLink} />
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2} component='form' onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography variant='h3'>Usuário</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display='flex' flexDirection='column' alignItems='center' gap={2}>
            <Typography variant='h5' textAlign='center'>
              Foto
            </Typography>
            <Avatar alt={user.username} src={user.cover?.url} sx={{ width: '12rem', height: '12rem' }}>
              {getFirstLetters(user.username)}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Typography variant='h5' textAlign='center'>
                Dados
              </Typography>
              <TextField
                fullWidth
                id='username'
                name='username'
                label='Nome de usuário'
                variant='outlined'
                placeholder='Digite o nome de usuário'
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
                placeholder='Digite o e-mail'
                type='email'
                value={data.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleChange}
                disabled={processing}
              />
              <FormControl error={!!errors.isRoot} disabled={processing} fullWidth>
                <FormControlLabel
                  control={<Checkbox checked={data.isRoot} onChange={handleCheckboxChange} id='isRoot' name='isRoot' />}
                  label='Administrador'
                />
                {!!errors.isRoot && <FormHelperText>{errors.isRoot}</FormHelperText>}
              </FormControl>
            </Stack>
          </Grid>
          {isNotRoot && (
            <Grid item xs={12} display='flex' flexDirection='column' gap={2}>
              <Typography variant='h5'>Salas vinculadas</Typography>
              <DataGrid
                autoHeight
                pagination
                rows={user.rooms ?? []}
                columns={columns}
                rowCount={user.rooms?.length ?? 0}
                disableSelectionOnClick
              />
            </Grid>
          )}
          {roomsToLink.length > 0 && (
            <Grid item xs={12}>
              <Typography variant='h5' color='warning.main'>
                Salas a vincular
              </Typography>
              {roomsToLink.map(({ id, name }) => (
                <Stack key={id} direction='row' spacing={2}>
                  <Box>
                    <Typography variant='h6' color='warning.main'>
                      ID
                    </Typography>
                    <Typography color='warning.main' textAlign='right'>
                      {id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='h6' color='warning.main'>
                      Nome da sala
                    </Typography>
                    <Typography color='warning.main'>{name}</Typography>
                  </Box>
                </Stack>
              ))}
            </Grid>
          )}
          <Grid item xs={12} display='flex' justifyContent='flex-end' gap={2}>
            {isNotRoot && <Button onClick={() => setIsOpen(true)}>Vincular Sala</Button>}
            <Button type='submit' disabled={processing}>
              Atualizar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default withDrawer(Show)
