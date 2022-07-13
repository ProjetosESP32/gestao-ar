import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import React, { ChangeEvent, FC, FormEvent } from 'react'

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
