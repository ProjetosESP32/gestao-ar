import { useForm } from '@inertiajs/inertia-react'
import { Button, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    await post('/admin/rooms', { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='sm'>
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
            <Button fullWidth type='submit' variant='contained' disabled={processing}>
              Criar sala
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}

export default NewRoomModal
