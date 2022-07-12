import { useForm } from '@inertiajs/inertia-react'
import { Button, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { FC } from 'react'

interface NewServiceApiModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewServiceApiModal: FC<NewServiceApiModalProps> = ({ isOpen, onClose }) => {
  const { data, post, processing, setData, errors, reset } = useForm({
    name: '',
    description: '',
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    await post('/admin/apis', { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='sm'>
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
            <TextField
              fullWidth
              id='description'
              name='description'
              label='Descrição'
              variant='outlined'
              placeholder='Digite a descrição dessa chave de API'
              value={data.description}
              error={!!errors.description}
              helperText={errors.description}
              onChange={handleChange}
              disabled={processing}
            />
            <Button fullWidth type='submit' variant='contained' disabled={processing}>
              Criar Chave
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}

export default NewServiceApiModal
