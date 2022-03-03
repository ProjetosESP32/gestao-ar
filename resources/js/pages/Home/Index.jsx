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
import faker from 'faker'
import React, { useState } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { useStyles } from '../../components/Classes/Index.jsx'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import { SecondaryTab, SecondaryTabPanel, SecondaryTabsList, MainTab, MainTabList } from '../../components/User/Tabs'

const Home = () => {
  const classes = useStyles()
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

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        {columns.map(column => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Item>
        </Grid>
        <Grid item xl={1} md={0} display={{ md: 'none', xl: 'block' }}></Grid>
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
            <TabPanelUnstyled value={0}>(Aqui vai ficar a agenda)</TabPanelUnstyled>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                          <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                            {columns.map(column => {
                              const value = row[column.id]
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
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
                    count={rows.length}
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
  { id: 'room', label: 'Sala', minWidth: 120 },
  { id: 'block', label: 'Bloco', minWidth: 60 },
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
    id: 'atualStatus',
    label: 'Status Atual',
    minWidth: 130,
    align: 'right',
  },
]

/**
 * @param {string} room
 * @param {string} block
 * @param {string} nextEvent
 * @param {string} observations
 * @param {string} atualStatus
 */
function createData(room, block, nextEvent, observations, atualStatus) {
  return { room, block, nextEvent, observations, atualStatus }
}

const rows = [
  createData('sala 01', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 02', 'B1', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
]

export default Home
