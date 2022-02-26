import { Page, PageProps } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Box, Grid, Modal } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { AccountButton } from '../../components/User/Buttons'
import { ControlInput, ControlLabel } from '../../components/User/TextField'
import UserTitle from '../../components/User/Title'

interface NewRoomModalProps {
  isOpen: boolean
  handleClose: () => void
}

interface NewRoomPageProp {
  rooms: {
    name: string
    block: string
    floor: string
  }[]
}

type NewRoomPage = Page<PageProps & NewRoomPageProp>

export const NewRoomModal: FC<NewRoomModalProps> = ({ isOpen, handleClose }) => {
  const { data, errors, post, processing, setData } = useForm({
    name: '',
    block: '',
    floor: '',
  })
  const { rooms } = usePage<NewRoomPage>().props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (processing) return

    await post('/rooms/create')
    handleClose()
  }

  const floors = useMemo(() => [...new Set(rooms.map(room => room.floor))], [rooms])
  const blocks = useMemo(() => [...new Set(rooms.map(room => room.block))], [rooms])

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
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
          Nova Sala
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
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
              <AccountButton type='submit'>Criar Sala</AccountButton>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default NewRoomModal
