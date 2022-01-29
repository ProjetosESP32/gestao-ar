import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
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
import React from 'react'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'

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
  BarElement
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
`
)
const StyledInput = styled('input')(
  ({ theme }) => `
  width:max-content;
  color: red;
  text-align: center;
  border: none;
  background-color: #F7F7F7;
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(1)};
  box-shadow: inset 0 0.24rem 0.48rem #00000029;
  &:hover{
    border:none;
  }
  &:before{
    border:none;
  }
  &:after{
    border:none;
  }
`
)

const RoomControl = () => {
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

  const labels = ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '23:59h']

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
            <Typography style={{ fontWeight: 'bolder', textAlign: 'left', margin: '1rem auto' }} variant='h4'>
              Sala
            </Typography>

            <Box
              component='form'
              sx={{
                '& > :not(style)': { m: 1 },
              }}
              noValidate
              autoComplete='off'
            >
              <Grid container justifyContent={'flex-start'} columns={{ xl: 12, md: 12 }}>
                <FormGrid xl={3} item>
                  <Typography variant='label'>Nome</Typography>
                  <StyledInput inputProps={ariaLabel} />
                </FormGrid>
                <FormGrid item xl={3}>
                  <Typography variant='label'>Id</Typography>
                  <StyledInput inputProps={ariaLabel} />
                </FormGrid>
                <FormGrid item xl={3}>
                  <Typography variant='label'>Bloco</Typography>

                  <StyledInput inputProps={ariaLabel} />
                </FormGrid>
                <FormGrid item xl={3}>
                  <Typography variant='label'>N. MAC</Typography>

                  <StyledInput inputProps={ariaLabel} />
                </FormGrid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xl={1} md={0} display={{ md: 'none', xl: 'block' }}></Grid>
        <Grid item xl={3} md={4}>
          <Item className='graphicsDuo'>
            <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
              Gasto Atual
            </Typography>
            <Doughnut data={data} style={{ height: '44vh!important' }} />
          </Item>
        </Grid>
        <Grid item xl={5} md={7}>
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

export default RoomControl
