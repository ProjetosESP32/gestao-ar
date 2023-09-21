import { AppLink } from '@/components/AppLink'
import { DailyConsumption } from '@/components/DailyConsumption'
import { withDrawer } from '@/components/Drawer'
import { MonthConsumption } from '@/components/MonthConsumption'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { Room } from '@/interfaces/Room'
import { usePage } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import React, { FC, Fragment, useState } from 'react'
import { MdAdd, MdRemove, MdWarning } from 'react-icons/md'

const getTemperature = (room: Room) => {
  if (!room.esps?.length) return 0

  const [esp] = room.esps
    .filter(({ status }) => !!status?.[0]?.temperature)
    .sort((e1, e2) => {
      const t1 = e1.status![0].temperature
      const t2 = e2.status![0].temperature

      return t1 - t2
    })

  if (!esp?.status?.length) return 0

  const [{ temperature }] = esp.status

  return Math.max(temperature, TEMP_MIN)
}

interface RoomShowPage {
  room: Room
  hasServices: boolean
}
type RoomShowPageProps = BasePageProps<RoomShowPage>

const TEMP_MAX = 27
const TEMP_MIN = 17

export const RoomAir: FC = () => {
  const { room, hasServices } = usePage<RoomShowPageProps>().props
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
              <Typography>{hasServices ? temperature : 0} °C</Typography>
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

const Show: FC = () => {
  const { room } = usePage<RoomShowPageProps>().props

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <RoomAir />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12}>
          <DailyConsumption />
        </Grid>
        <Grid item xs={12}>
          <MonthConsumption />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withDrawer(Show)
