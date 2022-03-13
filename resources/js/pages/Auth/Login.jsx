import { Link, useForm } from '@inertiajs/inertia-react'
import { Button, Checkbox, FormControlLabel, Grid, TextField, useTheme } from '@mui/material'
import React from 'react'
import { LoginTextField } from '../../components/Login/Input'
import './styles.css'

const Login = () => {
  const theme = useTheme()
  const { data, post, setData, errors } = useForm({
    email: '',
    password: '',
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

    await post('/auth/login')
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
              <Grid
                item
                md={7}
                xs={0}
                lg={6}
                xl={7}
                className='login-img'
                style={{
                  backgroundImage: `url('/images/login-img.svg')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                }}
              ></Grid>
              <Grid item md={5} xs={1} lg={6} xl={5} className='loginBox'>
                <Grid container spacing={3} columns={{ xs: 12, md: 12 }} alignItems='center' justifyContent='center'>
                  <Grid item xs={11} md={11} order={{ xs: 1, lg: 1 }}>
                    <h2 className='loginTitle'>Login</h2>
                  </Grid>
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
                  <Grid item xs={11} md={11} order={{ xs: 3, lg: 4 }}>
                    <LoginTextField
                      className='loginInput'
                      label='Email'
                      type='email'
                      name='email'
                      value={data.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={11} md={11} order={{ xs: 4, lg: 5 }}>
                    <LoginTextField
                      className='loginInput'
                      style={{ borderRadius: '8' }}
                      type='password'
                      label='Senha'
                      name='password'
                      value={data.password}
                      onChange={handleChange}
                      error={errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={11} md={11} order={{ xs: 5, lg: 6 }}>
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
                  <Grid item xs={11} md={11} order={{ xs: 7, lg: 7 }}>
                    <Button className='loginButton' variant='contained' style={{ borderRadius: '8' }} type='submit'>
                      Entrar
                    </Button>
                  </Grid>
                  <Grid
                    className='u'
                    item
                    xs={11}
                    md={11}
                    display='flex'
                    justifyContent='space-between'
                    order={{ xs: 5, lg: 8 }}
                  >
                    <Link href='/users/recover-password' className='forgotPassword'>
                      Esqueceu a senha
                    </Link>
                    <Link href='/auth/register'>Criar uma conta</Link>
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

export default Login
