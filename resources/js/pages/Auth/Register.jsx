import { useForm } from '@inertiajs/inertia-react'
import { Button, Checkbox, FormControlLabel, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useStyles } from '../../components/Classes/Index.jsx'
import { LoginTextField } from '../../components/Login/Input.jsx'
import './styles.css'

const Register = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { data, post, setData, errors } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: false,
  })

  const handleChange = e => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleCheckChange = e => {
    const { name } = e.target

    setData({ ...data, [name]: !data[name] })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    await post('/auth/register')
  }

  return (
    <div className='root'>
      <img src='/images/login-wave.svg' className='loginWave desktop' />
      <Grid container columns={{ xl: 12, lg: 12, height: '100vh' }} justifyContent='center'>
        <Grid item xl={7} lg={9}>
          <form className='loginContainer' onSubmit={handleSubmit}>
            <Grid
              container
              columns={{ xs: 12, md: 12 }}
              justifyContent='space-around'
              style={{ position: 'fixed', top: theme.spacing(2) }}
            >
              <Grid className='logoContainer' item xs={11} md={11} style={{ paddingTop: 0 }}>
                <img src='/images/if-icon.svg' />
              </Grid>
            </Grid>
            <Grid container columns={{ xs: 1, md: 12, lg: 12, xl: 12 }}>
              <Typography variant='h3'>Criar Conta</Typography>
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
                <Grid item sx={{ width: '100%' }} md={4} sm={11}>
                  <Grid item xs={11} md={11} className='loginIconGroup' order={{ xs: 6, lg: 2 }}>
                    <Button className='loginIconButton' variant='outlined'>
                      <img
                        style={{
                          width: '80%',
                          display: 'block',
                          margin: 'auto',
                        }}
                        src='/images/apple-icon.svg'
                      />
                    </Button>
                    <Button className='loginIconButton' variant='outlined'>
                      <img
                        style={{
                          width: '80%',
                          display: 'block',
                          margin: 'auto',
                        }}
                        src='/images/google-icon.svg'
                      />
                    </Button>
                  </Grid>

                  <Grid item className='desktop' xs={11} md={11} order={{ xs: 2, lg: 3 }}>
                    <div className='login-dividing-line'>
                      <div></div>
                      <p>Ou</p>
                      <div></div>
                    </div>
                  </Grid>

                  <Grid item sx={{ marginTop: '16px' }} xs={11}>
                    <LoginTextField
                      label='Nome'
                      variant='outlined'
                      type='text'
                      name='username'
                      value={data.username}
                      onChange={handleChange}
                      error={errors.username}
                      helperText={errors.username}
                    />
                  </Grid>
                  <Grid item xs={11} sx={{ marginTop: '16px' }}>
                    <LoginTextField
                      label='Email'
                      variant='outlined'
                      type='email'
                      name='email'
                      value={data.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={11} sx={{ marginTop: '16px' }}>
                    <LoginTextField
                      label='Senha'
                      variant='outlined'
                      type='password'
                      name='password'
                      value={data.password}
                      onChange={handleChange}
                      error={errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={11} sx={{ marginTop: '16px' }}>
                    <LoginTextField
                      label='Confirme Senha'
                      variant='outlined'
                      type='password'
                      name='passwordConfirmation'
                      value={data.passwordConfirmation}
                      onChange={handleChange}
                      error={errors.passwordConfirmation}
                      helperText={errors.passwordConfirmation}
                    />
                  </Grid>
                  <Grid item xs={11} sx={{ marginTop: '16px' }}>
                    <Grid item xs={6} md={11} order={{ xs: 5, lg: 6 }}>
                      <FormControlLabel
                        className='rememberUser'
                        name='rememberMe'
                        value={data.rememberMe}
                        control={<Checkbox value={data.rememberMe} />}
                        onChange={handleCheckChange}
                        label='Lembrar usuário'
                      />
                      <small>{errors.rememberMe}</small>
                    </Grid>
                  </Grid>
                  <Grid item xs={11} md={11} order={{ xs: 7, lg: 7 }}>
                    <Button className='loginButton' variant='contained' style={{ borderRadius: '8' }} type='submit'>
                      Criar conta
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default Register
