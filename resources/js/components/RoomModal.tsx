import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Box, Grid, Modal } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { BasePageProps } from '../interfaces/BasePageProps'
import { AccountButton } from './User/Buttons'
import { ControlInput, ControlLabel } from './User/TextField'
import UserTitle from './User/Title'

interface RoomModalProps {
  roomId: number
  isOpen: boolean
  handleClose: () => void
}

interface Room {
  id: number
  name: string
  block: string
  floor: string
}

interface RoomPageProp {
  rooms: Room[]
}

type RoomPage = BasePageProps<RoomPageProp>

export const RoomModal: FC<RoomModalProps> = ({ isOpen, handleClose, roomId }) => {
  const { rooms, loggedUser } = usePage<RoomPage>().props
  const { data, put, processing, setData } = useForm({
    id: roomId,
    name: '',
    block: '',
    floor: '',
  })

  const floors = [...new Set(rooms.map(room => room.floor))]
  const blocks = [...new Set(rooms.map(room => room.block))]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    await put(`/admin/rooms/${roomId}`)
    handleClose()
  }

  const handleDelete = () => {
    Inertia.delete(`/admin/rooms/${roomId}`, {
      onFinish: handleClose,
    })
  }

  useEffect(() => {
    const room = rooms.find(({ id }) => id === roomId)
    setData(oldData => ({ ...oldData, ...room }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, rooms])

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '0.5rem',
        }}
      >
        <UserTitle style={{ margin: '1.5rem 0' }} variant='body1'>
          Edição de Sala
        </UserTitle>

        <Grid container justifyContent='space-between' columns={11} alignItems='center'>
          <Grid item xs={11}>
            <ControlLabel>Nome</ControlLabel>
            <ControlInput value={data.name} onChange={handleChange} name='name' />
          </Grid>
          <Grid item xs={11}>
            <ControlLabel>Bloco</ControlLabel>
            <ControlInput value={data.block} onChange={handleChange} name='block' autoComplete='' list='block' />
            <datalist id='block'>
              {blocks.map(block => (
                <option key={block} value={block} />
              ))}
            </datalist>
          </Grid>
          <Grid item xs={11}>
            <ControlLabel>Piso</ControlLabel>
            <ControlInput value={data.floor} onChange={handleChange} name='floor' autoComplete='' list='floor' />
            <datalist id='floor'>
              {floors.map(floor => (
                <option key={floor} value={floor} />
              ))}
            </datalist>
          </Grid>
          <Grid item xs={11}>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: 2 }}>
              <AccountButton disabled={!loggedUser?.isRoot} type='submit'>
                Editar Sala
              </AccountButton>
              <AccountButton disabled={!loggedUser?.isRoot} onClick={handleDelete}>
                Deletar sala
              </AccountButton>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default RoomModal
