import { Grid, Button } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useTheme, styled } from '@mui/material/styles'

import React from 'react'
import UserTitle from '../../components/User/Title.jsx'
import MiniDrawer from '../../components/MiniDrawer/Index.jsx'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { MdLens } from 'react-icons/md'
import AccountTextField from '../../components/User/TextField.jsx'
import UserButton from '../../components/User/SubmitButton.jsx'

import { DataGrid } from '@mui/x-data-grid'
import { useForm } from '@inertiajs/inertia-react'

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

const StyledButton = styled(Button)({
  fontWeight: 'bold',
  width: 'max-content',
  padding: '0.5rem 2.5rem',
  backgroundColor: '#5D99C6',
  fontSize: '0.8rem',
  color: 'white!important',
  borderRadius: 32,
  margin: 'auto',
  [`&:hover`]: {
    backgroundColor: '#5D99C6',
  },
})
const HiddenTab = styled(Tab)({
  display: 'flex',
  width: '1px',
  minWidth: '1px',
  padding: '0',
})

const UserRegister = () => {
  const { data, setData, errors, post } = useForm({
    username: '',
    email: '',
  })
  const [value, setValue] = React.useState(0)

  const handleChange = async (_, newValue) => {
    await post('/admin/users/create')
    setValue(newValue)
  }

  const handleUserDataChange = e => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
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

                    <Grid container justifyContent={'center'} columns={11} alignItems={'center'}>
                      <Grid
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
                      <Grid item xs={4}>
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

                    <StyledTabs value={value} onChange={handleChange}>
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
                  <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <StyledButton>Salvar</StyledButton>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'room', headerName: 'Sala', minWidth: 130 },
  { field: 'block', headerName: 'Bloco', minWidth: 130 },
  {
    field: 'status',
    headerName: 'Status Atual',
    minWidth: 190,
  },
]

const rows = [
  { id: 1, room: 'Sala 1', block: 'Bloco 1', status: 'Ativa' },
  { id: 2, room: 'Sala 2', block: 'Bloco 1', status: 'Ativa' },
  { id: 3, room: 'Sala 3', block: 'Bloco 1', status: 'Ativa' },
  { id: 4, room: 'Sala 4', block: 'Bloco 1', status: 'Ativa' },
  { id: 5, room: 'Sala 5', block: 'Bloco 1', status: 'Ativa' },
  { id: 6, room: 'Sala 6', block: 'Bloco 1', status: 'Ativa' },
  { id: 7, room: 'Sala 7', block: 'Bloco 1', status: 'Ativa' },
  { id: 8, room: 'Sala 8', block: 'Bloco 1', status: 'Ativa' },
  { id: 9, room: 'Sala 9', block: 'Bloco 1', status: 'Ativa' },
]

export default UserRegister
