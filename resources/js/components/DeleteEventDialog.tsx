import { Inertia } from '@inertiajs/inertia'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import React, { FC, useState } from 'react'

interface DeleteEventDialogProps {
  open: boolean
  onClose: () => void
  eventId: number
  eventName: string
  roomId: number
}

export const DeleteEventDialog: FC<DeleteEventDialogProps> = ({ open, onClose, eventId, eventName, roomId }) => {
  const [processing, setProcessing] = useState(false)

  const handleDelete = () => {
    Inertia.delete(`/admin/rooms/${roomId}/schedules/${eventId}`, {
      onBefore: () => setProcessing(true),
      onFinish: () => {
        setProcessing(false)
        onClose()
      },
    })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Excluir {eventName}</DialogTitle>
      <DialogContent>
        <DialogContentText>Você tem certeza que deseja excluir {eventName}?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={processing}>
          Não excluir
        </Button>
        <Button onClick={handleDelete} autoFocus disabled={processing} color='error'>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
