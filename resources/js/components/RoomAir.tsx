import { usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import React, { FC, useState } from 'react'
import { MdAdd, MdRemove, MdWarning } from 'react-icons/md'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'

interface RoomAirPage {
  room: Room
  hasServices: boolean
}

type RoomAirPageProps = BasePageProps<RoomAirPage>

const TEMP_MAX = 28
const TEMP_MIN = 18

export const RoomAir: FC = () => {
  const { room, hasServices } = usePage<RoomAirPageProps>().props
  const theme = useTheme()
  const [power, setPower] = useState(() => !!room.esps?.some(({ isOn }) => isOn))
  const [processing, setProcessing] = useState(!hasServices)
  const [temperature, setTemperature] = useState(() => getTemperature(room))

  const handleChangePowerChange = async () => {
    setProcessing(true)
    try {
      await axios.post(`/rooms/control/${room.id}/power`)
      setPower(!power)
    } catch (err) {
      // do nothing
    } finally {
      setProcessing(false)
    }
  }

  const makeTemperatureChangeHandler = (newTemp: number) => async () => {
    if (TEMP_MIN <= newTemp && newTemp <= TEMP_MAX) {
      setProcessing(true)
      try {
        await axios.post(`/rooms/control/${room.id}/temperature`, { temperature: newTemp })
        setPower(true)
        setTemperature(newTemp)
      } catch (err) {
        // do nothing
      } finally {
        setProcessing(false)
      }
    }
  }

  return (
    <Paper sx={{ padding: 2 }}>
      {!hasServices && (
        <Box position='relative'>
          <Box
            position='absolute'
            top={2}
            right={2}
            display='flex'
            alignItems='center'
            gap={1}
            sx={{ [theme.breakpoints.down('md')]: { flexDirection: 'column', gap: 0 } }}
          >
            <MdWarning />
            <Typography variant='caption'>Sem serviços</Typography>
          </Box>
        </Box>
      )}
      <Stack spacing={2}>
        <Typography variant='h5'>Controle</Typography>
        <Stack direction='row' spacing={2} flexWrap='wrap'>
          <Box>
            <Typography variant='h6'>Temperatura</Typography>
            <Stack direction='row' alignItems='center'>
              <IconButton onClick={makeTemperatureChangeHandler(temperature - 1)} disabled={processing}>
                <MdRemove />
              </IconButton>
              <Typography>{temperature} °C</Typography>
              <IconButton onClick={makeTemperatureChangeHandler(temperature + 1)} disabled={processing}>
                <MdAdd />
              </IconButton>
            </Stack>
          </Box>
          <Box>
            <Typography variant='h6'>Power</Typography>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Switch
                    id='power'
                    name='power'
                    checked={power}
                    onChange={handleChangePowerChange}
                    disabled={processing}
                  />
                }
                label={power ? 'Ligado' : 'Desligado'}
              />
            </FormControl>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  )
}

const getTemperature = (room: Room) => {
  if (!room.esps?.length) return 0

  const [esp] = room.esps.sort((e1, e2) => {
    const t1 = e1.consumptions?.[0].temperature ?? -1
    const t2 = e2.consumptions?.[0].temperature ?? -1

    return t1 - t2
  })

  if (!esp.consumptions?.length) return 0

  const [{ temperature }] = esp.consumptions

  return temperature
}
