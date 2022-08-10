import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React, { FC } from 'react'

interface ExtendTimeDialogProps {
  open: boolean
  onClose: () => void
  roomId: number
}

export const ExtendTimeDialog: FC<ExtendTimeDialogProps> = ({ onClose, open, roomId }) => {
  const { data, setData, post, processing } = useForm({ amountOfTime: 5 })

  const handleSubtract = () => {
    const newTime = data.amountOfTime - 5

    if (newTime > 0) {
      setData({ amountOfTime: newTime })
    }
  }

  const handleSum = () => {
    const newTime = data.amountOfTime + 5

    if (newTime < 60) {
      setData({ amountOfTime: newTime })
    }
  }

  const handleExtend = () => {
    post(`/rooms/${roomId}/schedules`, { onFinish: () => onClose() })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Estender tempo de funcionamento</DialogTitle>
      <DialogContent>
        <ButtonGroup>
          <Button onClick={handleSubtract}>-</Button>
          <Button disabled>{data.amountOfTime} min</Button>
          <Button onClick={handleSum}>+</Button>
        </ButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExtend} autoFocus disabled={processing}>
          Estender
        </Button>
      </DialogActions>
    </Dialog>
  )
}
