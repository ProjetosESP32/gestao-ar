import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { FC, FormEvent } from 'react'
import { AutocompleteRoom } from './AutocompleteRoom'
import { Room } from '@/interfaces/Room'

interface EspModalProps {
  isOpen: boolean
  espId: number
  espName: string
  onClose: () => void
}

export const EspModal: FC<EspModalProps> = ({ espId, espName, isOpen, onClose }) => {
  const { put, processing, setData, reset } = useForm({ roomId: 0 })

  const handleChange = (room: Room) => {
    setData({ roomId: room.id })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    put(`/admin/esps/${espId}`, { onSuccess: () => handleClose() })
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='xs'>
        <Paper>
          <Stack component='form' onSubmit={handleSubmit} spacing={2} p={2}>
            <Typography variant='h6'>Vincular sala a {espName}</Typography>
            <AutocompleteRoom onChange={handleChange} disabled={processing} />
            <Button fullWidth type='submit' disabled={processing}>
              Vincular
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}
