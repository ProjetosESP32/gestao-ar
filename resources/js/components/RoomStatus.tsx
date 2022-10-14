import { usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { FC, Fragment } from 'react'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'

interface RoomAirPage {
  room: Room
}

type RoomAirPageProps = BasePageProps<RoomAirPage>

export const RoomStatus: FC = () => {
  const { room } = usePage<RoomAirPageProps>().props

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant='h5'>Status por ESP</Typography>
        {room.esps?.map(({ id, name, isOn, status }, idx, arr) => (
          <Fragment key={id}>
            <Stack direction='row' spacing={2} flexWrap='wrap'>
              <Box>
                <Typography>Nome</Typography>
                <Typography>{name}</Typography>
              </Box>
              <Box>
                <Typography>Ligado?</Typography>
                <Typography>{isOn ? 'Sim' : 'Não'}</Typography>
              </Box>
              <Box>
                <Typography>Humidade</Typography>
                <Typography>{status?.[0]?.humidity ?? 0}%</Typography>
              </Box>
              <Box>
                <Typography>Consumo</Typography>
                <Typography>{status?.[0]?.potency ?? 0}kWh</Typography>
              </Box>
              <Box>
                <Typography>Temperatura</Typography>
                <Typography>{status?.[0]?.temperature ?? 0}°C</Typography>
              </Box>
            </Stack>
            {idx !== arr.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Stack>
    </Paper>
  )
}
