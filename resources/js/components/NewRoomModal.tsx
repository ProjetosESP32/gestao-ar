import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'

interface NewRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewRoomModal: FC<NewRoomModalProps> = ({ isOpen, onClose }) => {
  const { data, post, processing, setData, errors, reset } = useForm({
    name: '',
    block: '',
    floor: '',
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

    post('/admin/rooms', { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='xs'>
        <Paper>
          <Stack component='form' onSubmit={handleSubmit} spacing={2} p={2}>
            <Typography variant='h6'>Criar sala</Typography>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Sala'
              variant='outlined'
              placeholder='Digite o nome da sala'
              value={data.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              disabled={processing}
            />
            <TextField
              fullWidth
              id='block'
              name='block'
              label='Bloco'
              variant='outlined'
              placeholder='Digite o bloco da sala'
              value={data.block}
              error={!!errors.block}
              helperText={errors.block}
              onChange={handleChange}
              disabled={processing}
            />
            <TextField
              fullWidth
              id='floor'
              name='floor'
              label='Piso'
              variant='outlined'
              placeholder='Digite o piso da sala'
              value={data.floor}
              error={!!errors.floor}
              helperText={errors.floor}
              onChange={handleChange}
              disabled={processing}
            />
            <Button fullWidth type='submit' disabled={processing}>
              Criar sala
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}

export default NewRoomModal
