import { useForm, usePage } from '@inertiajs/inertia-react'
import { Button, Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import { UserButton } from '../../components/User/Buttons.jsx'
import { AccountTextField } from '../../components/User/TextField.jsx'
import Avatar from '@mui/material/Avatar'
import UserTitle from '../../components/User/Title.jsx'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='span'>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const UserAccount = () => {
  const { user } = usePage().props
  const [value, setValue] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { data, setData, put, errors, processing } = useForm({
    username: user.username,
    email: user.email,
    cover: null,
  })
  const [imagePreview, setImagePreview] = useState(null)

  const handleUserDataChange = e => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleCoverChange = e => {
    const file = e.target.files?.item(0)

    if (file) {
      var reader = new FileReader()

      reader.onload = e => {
        setImagePreview(e.target.result)
        setData({ ...data, cover: file })
      }

      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = async () => {
    await put('/users')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
      <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
        <Grid item xl={7} md={11}>
          <UserTitle variant='p'>Conta</UserTitle>
        </Grid>
        <Grid item xl={7} md={11}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Geral' {...a11yProps(0)} />
              <Tab label='Salas' {...a11yProps(1)} />
              <Tab label='Segurança' {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item style={{ padding: '4rem 1rem' }}>
                  <UserAvatar variant='square'>
                    <img src={imagePreview ?? user.cover?.url ?? '/images/user.png'} />
                  </UserAvatar>

                  <input
                    id='userImage'
                    onChange={handleCoverChange}
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor='userImage'>
                    <StyledTypography variant='p'>
                      Alterar <MdModeEdit />
                    </StyledTypography>
                  </label>
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <Grid container justifyContent='center' columns={11}>
                    <Grid item xs={4}>
                      <UserTitle variant='p'>Dados Básicos</UserTitle>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid item xs={11}>
                        <AccountTextField
                          label='Nome'
                          variant='outlined'
                          type='text'
                          name='username'
                          value={data.username}
                          onChange={handleUserDataChange}
                          error={!!errors.username?.[0]}
                          helperText={errors.username?.[0]}
                        />
                        <AccountTextField
                          label='Email'
                          variant='outlined'
                          type='email'
                          name='email'
                          value={data.email}
                          onChange={handleUserDataChange}
                          error={!!errors.email?.[0]}
                          helperText={errors.email?.[0]}
                        />
                        <UserButton variant='contained' onClick={handleUpdate} disabled={processing}>
                          Salvar
                        </UserButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>

              <Grid item xs={3}></Grid>
              <Grid item xs={8}>
                <Item>
                  <Grid container columns={11}>
                    <Grid item xs={4}>
                      <UserTitle variant='p'>Conta Social</UserTitle>
                    </Grid>

                    <Grid item xs={7} className='loginIconGroup' style={{ flexDirection: ' column' }}>
                      <CssDiv>
                        <Typography variant='p'>Vinculada</Typography>
                        <Button className='loginIconButton'>
                          <img
                            style={{
                              width: '80%',
                              display: 'block',
                              margin: 'auto',
                            }}
                            src='/images/google-icon.svg'
                          />
                        </Button>
                      </CssDiv>
                      <CssDiv>
                        <Typography variant='p'>Vincular</Typography>

                        <Button className='loginIconButton'>
                          <img
                            style={{
                              width: '80%',
                              display: 'block',
                              margin: 'auto',
                            }}
                            src='/images/apple-icon.svg'
                          />
                        </Button>
                      </CssDiv>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <Item style={{ height: 'max-content', padding: '2rem' }}>
                  <UserTitle variant='p'>Registro de Salas</UserTitle>
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
                      labelRowsPerPage={'Linhas por página'}
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
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <Item>
                  <Grid container justifyContent={'center'} columns={11} alignItems={'center'}>
                    <Grid
                      item
                      xs={7}
                      style={{
                        padding: '0px',
                        minHeight: '45vh',
                        backgroundImage: `url('/images/user-resetpass-img.svg')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                      }}
                    ></Grid>
                    <Grid item xs={4}>
                      <UserTitle variant='p'>Alterar Senha</UserTitle>

                      <Grid item xs={11}>
                        <AccountTextField label='Senha Atual' variant='outlined' />
                        <AccountTextField label='Nova Senha' variant='outlined' />
                        <AccountTextField label='Repita A Nova Senha' variant='outlined' />

                        <UserButton variant='contained'>Salvar</UserButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </MiniDrawer>
  )
}

const CssDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: 'max-content',
  margin: '1rem 0',
  [`& span`]: {
    width: '100%',
    textAlign: 'left',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
})

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const UserAvatar = styled(Avatar)({
  borderRadius: '50%',
  height: '12vh',
  width: '12vh',
  [`& img`]: {
    width: '100%',
    height: '100%',
  },
  margin: 'auto',
})

const StyledTypography = styled(Typography)({
  display: 'block',
  marginTop: '1rem',
  fontSize: '1.1rem',
  [`& svg`]: {
    width: '1.2rem',
    height: '1.2rem',
  },
})

/* Table data */
const columns = [
  { id: 'room', label: 'Sala', minWidth: 170 },
  { id: 'block', label: 'Bloco', minWidth: 100 },
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
    minWidth: 170,
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
  createData('sala 03', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
  createData('sala 04', 'B2', '13 / agosto / 2021 às 13:00h', '-', 'ativa'),
]

export default UserAccount
