import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { AccountTextField, ControlInput, ControlLabel } from '../../components/User/TextField.jsx'
import Paper from '@mui/material/Paper'
import { styled, useTheme } from '@mui/material/styles'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from 'chart.js'
import faker from 'faker'
import React, { useState } from 'react'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'

import NativeSelect from '@mui/material/NativeSelect'
import { IconButton } from '@mui/material'
import { MdAdd, MdRemove } from 'react-icons/md'

const ariaLabel = { 'aria-label': 'description' }

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
const FormGrid = styled(Grid)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  align-itens:center;
`,
)

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
  const [temp, setTemp] = useState(20)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const theme = useTheme()

  return (
    <MiniDrawer>
      <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
        <Grid item xl={1} md={0} display={{ md: 'none', xl: 'block' }}></Grid>

        <Grid item xl={8} md={11}>
          <Item style={{ height: 'max-content', padding: '2rem' }}>
            <BlockTitle variant='h4'>Sala</BlockTitle>

            <Box component='form'>
              <Grid container justifyContent={'flex-start'} spacing={1} columns={{ xl: 12, md: 12 }}>
                <FormGrid xl={2} item>
                  <ControlLabel variant='label'>Nome</ControlLabel>
                  <ControlInput />
                </FormGrid>
                <FormGrid item xl={2}>
                  <ControlLabel variant='label'>Id</ControlLabel>
                  <ControlInput />
                </FormGrid>
                <FormGrid item xl={2}>
                  <ControlLabel variant='label'>Bloco</ControlLabel>
                  <ControlInput />
                </FormGrid>
                <FormGrid item xl={2}>
                  <ControlLabel variant='label'>N. MAC</ControlLabel>
                  <ControlInput />
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
              <Grid container justifyContent={'flex-start'} spacing={1} columns={{ xl: 12, md: 12 }}>
                <FormGrid item xl={2.5}>
                  <ControlLabel variant='label'>Temperatura</ControlLabel>
                  <ControlButton>
                    <StyledIconButton
                      onClick={() => {
                        setTemp(temp - 1)
                      }}
                    >
                      <MdRemove />
                    </StyledIconButton>
                    {temp} C
                    <StyledIconButton
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
                  <StyledSelect
                    defaultValue={30}
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={10}>On</option>
                    <option value={20}>Off</option>
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
              <Grid container justifyContent={'flex-start'} spacing={1} columns={{ xl: 12, md: 12 }}>
                <FormGrid xl={3} item>
                  <ControlLabel variant='label'>Temp.</ControlLabel>
                  <ControlInput />
                </FormGrid>
                <FormGrid item xl={3}>
                  <ControlLabel variant='label'>Humidade</ControlLabel>
                  <ControlInput />
                </FormGrid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xl={4} md={4}>
          <Item className='graphicsDuo'>
            <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
              Gasto Atual
            </Typography>
            <Doughnut data={data} style={{ height: '44vh!important' }} />
          </Item>
        </Grid>
        <Grid item xl={4} md={7}>
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
    </MiniDrawer>
  )
}

const data = {
  labels: ['Bloco A', 'Bloco B', 'Bloco C'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['#36a1ea', '#005b9f', '#0288d1'],
    },
  ],
}

const labels = ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '23:59h']

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

const lineData = {
  labels,
  datasets: [
    {
      label: 'Watts',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235)',
    },
  ],
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

const barData = {
  labels: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  datasets: [
    {
      label: 'Consumo em Watt',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: ['#005b9f', '#0288d1', '#c3fdff', '#36a1ea', '#005b9f'],
    },
  ],
}

export default RoomControl
