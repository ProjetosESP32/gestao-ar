import { useForm, usePage } from '@inertiajs/inertia-react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import * as PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useStyles } from '../../components/Classes/Index'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import { AccountButton } from '../../components/User/Buttons.jsx'
import { AccountTextField } from '../../components/User/TextField.jsx'
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
          <Typography variant='label'>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const StyledTabs = styled(Tabs)({
  border: 'none',
  margin: '1rem',
  justifyContent: 'center',
  [`& span`]: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
})

const StyledTab = styled(Tab)({
  fontWeight: 'bold',
  width: 'max-content',
  padding: '0.5rem 2.5rem',
  backgroundColor: '#5D99C6',
  fontSize: '0.8rem',
  color: 'white!important',
  borderRadius: 32,
  margin: 'auto',
})

const HiddenTab = styled(Tab)({
  display: 'flex',
  width: '1px',
  minWidth: '1px',
  padding: '0',
})

const UserRegister = () => {
  const classes = useStyles()
  const { rooms } = usePage().props
  const { data, setData, errors, post } = useForm({
    username: '',
    email: '',
    roomIds: [],
  })
  const [value, setValue] = useState(0)

  const handleNext = (_, newValue) => setValue(newValue)

  const handleChange = async () => {
    await post('/admin/users', {
      onError: () => {
        setValue(0)
      },
    })
  }

  const handleUserDataChange = e => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleRoomChange = roomIds => {
    setData({ ...data, roomIds })
  }

  return (
    <MiniDrawer>
      <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
        <Grid item xl={8} md={11}>
          <div style={{ margin: '0.5rem 0' }}>
            <UserTitle variant='p'>Cadastro de usuário</UserTitle>
          </div>
        </Grid>
        <Grid item xl={8} md={11}>
          <Box sx={{ width: '100%' }}>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={11}>
                  <Item>
                    <UserTitle style={{ margin: '1.5rem 0' }} variant='p'>
                      Dados Para Cadastro
                    </UserTitle>

                    <Grid container justifyContent='center' columns={11} alignItems='center'>
                      <Grid
                        className={classes.desktop}
                        item
                        xs={7}
                        style={{
                          padding: '0px',
                          minHeight: '40vh',
                          backgroundImage: "url('/images/user-register-img.svg')",
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                        }}
                      ></Grid>
                      <Grid item md={4} sm={11}>
                        <Grid item xs={11}>
                          <AccountTextField
                            label='Nome'
                            variant='outlined'
                            type='text'
                            name='username'
                            value={data.username}
                            onChange={handleUserDataChange}
                            error={errors.username}
                            helperText={errors.username}
                          />
                          <AccountTextField
                            label='Email'
                            variant='outlined'
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={handleUserDataChange}
                            error={errors.email}
                            helperText={errors.email}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <StyledTabs value={value} onChange={handleNext}>
                      <HiddenTab {...a11yProps(0)} />
                      <StyledTab label='Próximo' {...a11yProps(1)} />
                    </StyledTabs>
                  </Item>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Item>
                <div style={{ display: 'flex', margin: '1rem auto' }}>
                  <UserTitle variant='p'>Seleção de Salas</UserTitle>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rooms}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={handleRoomChange}
                  />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <AccountButton onClick={handleChange} disabled={data.roomIds === 0}>
                    Salvar
                  </AccountButton>
                </div>
              </Item>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </MiniDrawer>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

const columns = [
  { field: 'room', headerName: 'Sala', minWidth: 130 },
  { field: 'block', headerName: 'Bloco', minWidth: 130 },
  {
    field: 'floor',
    headerName: 'Piso',
    minWidth: 130,
  },
]

export default UserRegister
