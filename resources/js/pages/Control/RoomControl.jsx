import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import NativeSelect from '@mui/material/NativeSelect'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md'
import { RiShutDownLine } from 'react-icons/ri'
import { useStyles } from '../../components/Classes/Index.jsx'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import { ControlInput, ControlLabel } from '../../components/User/TextField.jsx'
import { getMonthsByNumber } from '../../utils/getMonthsByNumber'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
)

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
const FormGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-itens: center;
`

const BlockTitle = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 'bolder',
  textAlign: 'left',
  marginBottom: '0.2rem',
}))

const StyledSelect = styled(NativeSelect)(() => ({
  padding: '0.2rem 0.5rem',
  fontWeight: 'bolder',
  color: '#90CAF9',
  backgroundColor: 'white',
  boxShadow: ' 0px 3px 6px #00000029',
  borderRadius: '10px',
  [`&:hover &:after`]: {
    borderBottom: 'none',
  },
  [`& select`]: {
    backgroundColor: 'white',
    [`&:hover`]: {
      borderBottom: 'none',
    },
  },
  [`&:after`]: {
    borderBottom: 'none',
  },
  [`&:before`]: {
    borderBottom: 'none',
  },
}))

const ControlButton = styled(Paper)(() => ({
  // backgroundColor: '#41C87B',
  padding: '0.1rem 0rem',
  fontWeight: 'bolder',
  width: 'max-content',
  boxShadow: ' 0px 3px 6px #00000029',
  borderRadius: '10px',
  color: '#90CAF9',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.1rem',
}))

const StyledLabel = styled(Paper)(() => ({
  padding: '0.75rem 0.35rem',
  width: '48%',
  boxShadow: ' 0px 3px 6px #00000029',
  display: 'flex',
  margin: '0.5rem auto',
  '& span': {
    color: '#90CAF9',
  },
  '& p': {
    marginLeft: '0.4rem',
    color: '#002984',
  },
}))

const MobileControlButton = styled(Paper)(() => ({
  padding: '0.75rem 0.35rem',
  width: '100%',
  boxShadow: ' 0px 3px 6px #00000029',
  display: 'block',
  margin: '0.5rem auto',
  '& span': {
    color: '#5D99C6',
    fontSize: '1.75rem',
    fontWeight: 'bolder',
    textAlign: 'center',
    width: '100%',
  },
  '& p': {
    color: '#5D99C6',
    fontSize: '1.2rem',
    fontWeight: 'bolder',
    textAlign: 'center',
    width: '100%',
  },
}))

const StyledIconButton = styled(IconButton)(() => ({
  color: 'white',
  padding: '0.3rem',
  '& button': {
    '& svg': {
      fill: 'white',
      color: 'white',
    },
  },
  [`& button`]: {
    [`& svg`]: {
      fill: 'white',
    },
  },
}))

const RoomControl = () => {
  const classes = useStyles()
  const { props: pageProps, url } = usePage()
  const { loggedUser, room, esps, canEdit, consumptionNow, dailyConsumption, monthConsumption } = pageProps
  const [temp, setTemp] = useState(20)
  const { data, setData, post, processing } = useForm({ espMac: 'default' })
  const lastStatus = room.esps.some(({ isOn }) => isOn)

  const doughnutData = {
    labels: ['Gasto'],
    datasets: [{ data: [consumptionNow.totalPotency], backgroundColor: 'rgba(53, 162, 235)' }],
  }

  const labels = dailyConsumption.map(({ createdAt }) => DateTime.fromISO(createdAt).toFormat('dd'))

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Watts',
        data: dailyConsumption.map(({ totalPotency }) => totalPotency),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235)',
      },
    ],
  }

  const barData = {
    labels: monthConsumption.map(({ month }) => getMonthsByNumber(month - 1)),
    datasets: [
      {
        label: 'Consumo (Watts)',
        data: monthConsumption.map(({ totalPotency }) => totalPotency),
        backgroundColor: ['#005b9f', '#0288d1', '#c3fdff', '#36a1ea', '#005b9f'],
      },
    ],
  }

  const handleAddEsp = async () => {
    if (data.espMac === 'default') return

    await post(`/admin/rooms/${room.id}/esps`)
  }

  return (
    <MiniDrawer>
      <Grid
        className={classes.desktop}
        container
        spacing={2}
        columns={{ xl: 11, lg: 11, md: 11 }}
        justifyContent='center'
      >
        <Grid item xl={1} md={0} display={{ md: 'none', xl: 'block' }}></Grid>

        <Grid item xl={8} md={11}>
          <Item style={{ height: 'max-content', padding: '2rem' }}>
            <BlockTitle variant='h4'>Sala</BlockTitle>

            <Box component='form'>
              <Grid container justifyContent='flex-start' spacing={1} columns={{ xl: 12, md: 12 }}>
                <FormGrid item xl={2}>
                  <ControlLabel variant='label'>Id</ControlLabel>
                  <ControlInput value={room.id} readOnly />
                </FormGrid>
                <FormGrid xl={2} item>
                  <ControlLabel variant='label'>Nome</ControlLabel>
                  <ControlInput value={room.name} readOnly />
                </FormGrid>
                <FormGrid item xl={2}>
                  <ControlLabel variant='label'>Bloco</ControlLabel>
                  <ControlInput value={room.block} readOnly />
                </FormGrid>
                <FormGrid item xl={2}>
                  <ControlLabel variant='label'>Piso</ControlLabel>
                  <ControlInput value={room.floor} readOnly />
                </FormGrid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xl={1} md={0} display={{ md: 'none', xl: 'block' }}></Grid>

        <Grid item xl={4} md={5.5}>
          <Item style={{ height: 'max-content', padding: '2rem' }}>
            <BlockTitle variant='h4'>Controle</BlockTitle>
            <Box component='form'>
              <Grid container justifyContent='flex-start' spacing={1} columns={{ xl: 12, md: 12 }}>
                <FormGrid item xl={2.5}>
                  <ControlLabel variant='label'>Temperatura</ControlLabel>
                  <ControlButton>
                    <StyledIconButton
                      disabled={!lastStatus || !canEdit}
                      onClick={() => {
                        setTemp(temp - 1)
                      }}
                    >
                      <MdRemove />
                    </StyledIconButton>
                    {lastStatus ? `${temp} °C` : '--'}
                    <StyledIconButton
                      disabled={!lastStatus || !canEdit}
                      onClick={() => {
                        setTemp(temp + 1)
                      }}
                    >
                      <MdAdd />
                    </StyledIconButton>
                  </ControlButton>
                </FormGrid>
                <FormGrid xl={1.5} item>
                  <ControlLabel variant='label'>Power</ControlLabel>
                  <StyledSelect value={lastStatus ? 'on' : 'off'} disabled={!canEdit} onClick={console.log}>
                    <option value='on'>On</option>
                    <option value='off'>Off</option>
                  </StyledSelect>
                </FormGrid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xl={4} md={5.5}>
          <Item style={{ height: 'max-content', padding: '2rem' }}>
            <BlockTitle variant='h4'>Status</BlockTitle>
            <Box component='form'>
              {room.esps.map(({ id, name, macAddress, consumptions }) => (
                <Grid key={id} container justifyContent='flex-start' spacing={1} columns={{ xl: 12, md: 12 }}>
                  <FormGrid xl={3} item>
                    <ControlLabel variant='label'>ESP.</ControlLabel>
                    <ControlInput value={name ? `${name} - ${macAddress}` : macAddress} readOnly />
                  </FormGrid>
                  <FormGrid xl={3} item>
                    <ControlLabel variant='label'>Temp.</ControlLabel>
                    <ControlInput value={consumptions[0]?.temperature} readOnly />
                  </FormGrid>
                  <FormGrid item xl={3}>
                    <ControlLabel variant='label'>Humidade</ControlLabel>
                    <ControlInput value={consumptions[0]?.humidity} readOnly />
                  </FormGrid>
                  {!!loggedUser?.isRoot && (
                    <FormGrid item xl={1.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={() => Inertia.delete(`${url}/remove-esp/${id}`)}>
                        <MdDelete />
                      </IconButton>
                    </FormGrid>
                  )}
                </Grid>
              ))}
              {!!loggedUser?.isRoot && (
                <FormGrid xl={3} item>
                  <ControlLabel variant='label'>Adicionar ESP</ControlLabel>
                  <StyledSelect value={data.espMac} onChange={e => setData({ espMac: e.target.value })}>
                    <option value='default'>Selecione um MAC</option>
                    {esps.map(({ id, macAddress }) => (
                      <option key={id} value={macAddress}>
                        {macAddress}
                      </option>
                    ))}
                  </StyledSelect>
                  <Button
                    variant='contained'
                    sx={{ margin: 1, padding: 1 }}
                    onClick={handleAddEsp}
                    disabled={data.espMac === 'default' || processing}
                  >
                    Adicionar
                  </Button>
                </FormGrid>
              )}
            </Box>
          </Item>
        </Grid>
        <Grid item xl={4} md={5}>
          <Item className='graphicsDuo' sx={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
            <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
              Gasto Atual
            </Typography>
            <Doughnut data={doughnutData} style={{ height: '44vh!important' }} />
          </Item>
        </Grid>
        <Grid item xl={4} md={6}>
          <Item className='graphicsDuo'>
            <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
              Gastos Diários
            </Typography>
            <Line options={lineOptions} data={lineData} style={{ height: '44vh!important' }} />
          </Item>
        </Grid>
        <Grid item xl={8} md={11}>
          <Item>
            <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
              Gastos Mensais
            </Typography>
            <Bar options={barOptions} data={barData} />
          </Item>
        </Grid>
      </Grid>
      <Grid
        className={classes.mobile}
        container
        spacing={2}
        columns={{ xl: 11, lg: 11, md: 11 }}
        justifyContent='center'
      >
        <Grid item sm={11} sx={{ width: '100%' }}>
          <Item style={{ padding: '2rem' }}>
            <BlockTitle variant='h4'>Controle Ar</BlockTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <StyledLabel>
                <span>ID:</span>
                <p>{room.id}</p>
              </StyledLabel>
              <StyledLabel>
                <span>Nome:</span>
                <p>{room.name}</p>
              </StyledLabel>
              <StyledLabel>
                <span>Bloco:</span>
                <p>{room.block}</p>
              </StyledLabel>
              <StyledLabel>
                <span>Piso:</span>
                <p>{room.floor}</p>
              </StyledLabel>
              <StyledLabel>
                <span>Status:</span>
                <p>{lastStatus}</p>
              </StyledLabel>
            </div>
            <MobileControlButton>
              <span>24 °C</span>
              <p>Temp. Atual</p>
            </MobileControlButton>
            <MobileControlButton>
              <IconButton>
                <MdAdd size={32}></MdAdd>
              </IconButton>
            </MobileControlButton>
            <MobileControlButton>
              <IconButton>
                <MdRemove size={32}></MdRemove>
              </IconButton>
            </MobileControlButton>
            <MobileControlButton>
              <IconButton>
                <RiShutDownLine size={32} style={{ fill: 'red' }}></RiShutDownLine>
              </IconButton>
            </MobileControlButton>
          </Item>
        </Grid>
      </Grid>
    </MiniDrawer>
  )
}

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0,0,0,0)',
      },
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0)',
      },
    },
  },
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0,0,0,0)',
      },
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0)',
      },
    },
  },
}

export default RoomControl
