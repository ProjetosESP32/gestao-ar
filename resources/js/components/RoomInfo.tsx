import { usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'
import { AppLink } from './AppLink'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'

interface RoomInfoPage {
  room: Room
}

type RoomInfoPageProps = BasePageProps<RoomInfoPage>

export const RoomInfo: FC = () => {
  const { room } = usePage<RoomInfoPageProps>().props

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h5'>Sala</Typography>
        <Stack direction='row' spacing={4} flexWrap='wrap'>
          <Box>
            <Typography variant='h6'>ID</Typography>
            <Typography textAlign='right'>{room.id}</Typography>
          </Box>
          <Box>
            <Typography variant='h6'>Nome</Typography>
            <Typography>{room.name}</Typography>
          </Box>
          <Box>
            <Typography variant='h6'>Bloco</Typography>
            <Typography>{room.block}</Typography>
          </Box>
          <Box>
            <Typography variant='h6'>Piso</Typography>
            <Typography>{room.floor}</Typography>
          </Box>
          <Box>
            <Typography variant='h6'>Agenda</Typography>
            <AppLink href={`/rooms/${room.id}/schedules`}>Ver agenda</AppLink>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  )
}
