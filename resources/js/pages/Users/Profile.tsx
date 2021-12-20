import { Inertia, Page, PageProps } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import type { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { Button, Container, FormGroup, Input, Stack, TextField } from '@mui/material'
import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react'

interface IProfileForm {
  username: string
  email: string
}

interface IUser {
  id: number
  username: string
  email: string
  cover: AttachmentContract
}

interface IHomePageProps extends PageProps {
  user: IUser
}

const Profile: FC = () => {
  const { user } = usePage<Page<IHomePageProps>>().props
  const { data, setData, put, processing, errors } = useForm<IProfileForm>(user)
  const [cover, setCover] = useState<File | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files?.item(0) ?? null)
  }

  const handleCoverUpdate = () => {
    if (cover) {
      const formData = new FormData()
      formData.append('file', cover)

      Inertia.patch('/users/cover', formData)
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    await put('/users/update')
  }

  return (
    <Container maxWidth='md' sx={{ marginTop: 16 }}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Stack spacing={1}>
            <h1>Perfil</h1>

            {user.cover && <img src={user.cover.url} alt='Foto de perfil' />}

            <Input type='file' id='cover' name='cover' onChange={handleFileInput} />
            {cover && <Button onClick={handleCoverUpdate}>Atualizar foto</Button>}

            <TextField
              name='username'
              id='username'
              required
              label='Nome de usuário'
              type='text'
              value={data.username}
              onChange={handleChange}
              error={'username' in errors}
              helperText={errors.username}
            />
            <TextField
              name='email'
              id='email'
              required
              label='E-mail'
              type='email'
              value={data.email}
              onChange={handleChange}
              error={'email' in errors}
              helperText={errors.email}
            />

            <Button type='submit' variant='outlined' disabled={processing}>
              Atualizar
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </Container>
  )
}

export default Profile
