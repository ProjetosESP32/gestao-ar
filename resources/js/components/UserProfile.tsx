import { useForm, usePage } from '@inertiajs/inertia-react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { BasePageProps } from '../interfaces/BasePageProps'
import { getFirstLetters } from '../utils/getFirstLetters'
import Cropper from './Cropper'

interface UserProfileFormData {
  username: string
  email: string
  cover: Blob | File | null
}

export const UserProfile: FC = () => {
  const { loggedUser } = usePage<BasePageProps>().props
  const { data, setData, errors, processing, put } = useForm<UserProfileFormData>({
    username: loggedUser.username,
    email: loggedUser.email,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await put('/users', {
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
              alt={loggedUser.username}
              src={imagePreview ?? loggedUser.cover?.url}
              sx={{ width: '7.5rem', height: '7.5rem' }}
            >
              {getFirstLetters(loggedUser.username)}
            </Avatar>
            {!!errors.cover && <FormHelperText color='error'>{errors.cover}</FormHelperText>}

            <Cropper disabled={processing} onChange={handleCropChange}>
              <Typography variant='h6' textAlign='center'>
                <MdEdit /> Trocar foto
              </Typography>
            </Cropper>
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
                <Button variant='contained' fullWidth type='submit' disabled={processing}>
                  Atualizar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
