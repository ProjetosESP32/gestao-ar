import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import React, { FC } from 'react'

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

export default NewServiceApiModal
