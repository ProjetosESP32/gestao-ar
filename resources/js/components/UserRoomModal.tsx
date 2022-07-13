import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { FC, useState } from 'react'
import { AutocompleteRoom } from './AutocompleteRoom'
import { Room } from '@/interfaces/Room'

interface UserRoomModalProps {
  isOpen: boolean
  onClose: () => void
  onLink: (room: Room) => void
}

export const UserRoomModal: FC<UserRoomModalProps> = ({ isOpen, onClose, onLink }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room>()

  const handleChange = (room: Room) => {
    setSelectedRoom(room)
  }

  const handleLink = () => {
    if (!selectedRoom) return

    onLink(selectedRoom)
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ display: 'grid', placeItems: 'center' }}>
      <Container maxWidth='xs'>
        <Paper>
          <Stack spacing={2} p={2}>
            <Typography variant='h6'>Vincular sala ao usuário</Typography>
            <AutocompleteRoom onChange={handleChange} />
            <Button fullWidth disabled={!selectedRoom} onClick={handleLink}>
              Vincular
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}
