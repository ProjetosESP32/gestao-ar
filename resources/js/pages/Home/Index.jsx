import { usePage } from '@inertiajs/inertia-react'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import { Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
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
import Agenda from '../../components/Agenda'
import { useStyles } from '../../components/Classes/Index.jsx'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import { MainTab, MainTabList, SecondaryTab, SecondaryTabPanel, SecondaryTabsList } from '../../components/User/Tabs'

const Home = () => {
  const classes = useStyles()
  const { rooms, consumptionNow, dailyConsumption, monthConsumption } = usePage().props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const data = {
    labels: consumptionNow.map(({ block }) => `Bloco ${block.toUpperCase()}`),
    datasets: [
      {
        label: 'Blocos',
        data: consumptionNow.map(({ totalPotency }) => Number(totalPotency)),
        backgroundColor: ['#36a1ea', '#005b9f', '#0288d1'],
      },
    ],
  }

  const labels = dailyConsumption.map(({ createdAt }) => DateTime.fromISO(createdAt).toFormat('dd'))

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Consumo (Watts)',
        data: dailyConsumption.map(({ totalPotency }) => Number(totalPotency)),
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
        data: monthConsumption.map(({ totalPotency }) => Number(totalPotency)),
        backgroundColor: ['#005b9f', '#0288d1', '#c3fdff', '#36a1ea', '#005b9f'],
      },
    ],
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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
            <Typography style={{ fontWeight: 'bolder', textAlign: 'left', margin: '1rem auto' }} variant='h4'>
              Salas
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: '0.5rem' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map(column => (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map(column => {
                          const value = row[column.id]
                          return (
                            <TableCell key={`${column.id}__${value}`} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component='div'
                count={rooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Item>
        </Grid>

        <Grid item xl={1} md={0} display={{ md: 'none', xl: 'block' }}></Grid>
        <Grid item xl={8} md={11}>
          <Item style={{ height: 'max-content', padding: '2rem' }}>
            <Typography style={{ fontWeight: 'bolder', textAlign: 'left', margin: '1rem auto' }} variant='h4'>
              Agenda
            </Typography>
            <Agenda />
          </Item>
        </Grid>
        <Grid item xl={4} md={5}>
          <Item className='graphicsDuo' sx={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
            <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
              Gasto Atual
            </Typography>
            <Doughnut data={data} style={{ height: '44vh!important' }} />
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
        <Grid item xs={11} style={{ width: '100%', paddingTop: '0' }}>
          <TabsUnstyled defaultValue={0}>
            <MainTabList>
              <MainTab>Agenda</MainTab>
              <MainTab>Consumo</MainTab>
              <MainTab>Salas</MainTab>
            </MainTabList>
            <TabPanelUnstyled value={0}>
              <Agenda />
            </TabPanelUnstyled>
            <TabPanelUnstyled value={1}>
              <TabsUnstyled defaultValue={0}>
                <SecondaryTabsList>
                  <SecondaryTab>Atual</SecondaryTab>
                  <SecondaryTab>Diário</SecondaryTab>
                  <SecondaryTab>Mensal</SecondaryTab>
                </SecondaryTabsList>
                <SecondaryTabPanel value={0}>
                  <Item className='graphicsDuo'>
                    <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
                      Gasto Atual
                    </Typography>
                    <Doughnut
                      data={data}
                      style={{ height: '44vh!important', maxWidth: '400px', margin: 'auto', width: '100%' }}
                    />
                  </Item>
                </SecondaryTabPanel>
                <SecondaryTabPanel value={1}>
                  <Item className='graphicsDuo'>
                    <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
                      Gastos Diários
                    </Typography>
                    <Line options={lineOptions} data={lineData} style={{ height: '44vh!important' }} />
                  </Item>
                </SecondaryTabPanel>
                <SecondaryTabPanel value={2}>
                  <Item sx={{ overflowY: 'scroll' }}>
                    <Typography style={{ fontWeight: 'bolder', margin: '1rem auto' }} variant='h4'>
                      Gastos Mensais
                    </Typography>
                    <Bar options={barOptions} data={barData} />
                  </Item>
                </SecondaryTabPanel>
              </TabsUnstyled>
            </TabPanelUnstyled>
            <TabPanelUnstyled value={2}>
              <Item style={{ height: 'max-content', padding: '0.5rem' }}>
                <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', padding: '0.5rem' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label='sticky table'>
                      <TableHead>
                        <TableRow>
                          {columns.map(column => (
                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                          <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                            {columns.map(column => {
                              const value = row[column.id]
                              return (
                                <TableCell key={`${column.id}__${value}`} align={column.align}>
                                  {column.format ? column.format(value) : value}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component='div'
                    count={rooms.length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={'Linhas'}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Item>
            </TabPanelUnstyled>
          </TabsUnstyled>
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

const columns = [
  { id: 'name', label: 'Sala', minWidth: 120 },
  { id: 'block', label: 'Bloco', minWidth: 60 },
  { id: 'floor', label: 'Piso', minWidth: 30 },
  {
    id: 'nextEvent',
    label: 'Próximo Evento',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'observations',
    label: 'Obs',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'lastStatus',
    label: 'Status Atual',
    minWidth: 130,
    align: 'right',
    format: value => (value ? 'Ligada' : 'Desligada'),
  },
]

const getMonthsByNumber = num =>
  [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ][num]

export default Home
