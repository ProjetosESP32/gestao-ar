import { ThemeProvider, Box, Button, TextField, Grid, RadioGroup, Radio, FormControlLabel } from '@mui/material'
import React from 'react'
import './styles.css'
import { theme } from '../../theme.jsx'

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <div className={'root'}>
        <img src={'/images/login-wave.svg'} className={'loginWave desktop'} />
        <Grid container columns={{ xl: 12, lg: 12 }} justifyContent={'center'}>
          <Grid item xl={7} lg={9}>
            <div className={'loginContainer'}>
              <Grid
                container
                columns={{ xs: 12, md: 12 }}
                justifyContent={'space-around'}
                style={{ position: 'fixed', top: theme.spacing(2) }}
              >
                <Grid item xs={11} md={11}>
                  <img src={'/images/logo.svg'} />
                </Grid>
              </Grid>
              <Grid container columns={{ xs: 1, md: 12, lg: 12, xl: 12 }}>
                <Grid
                  item
                  md={7}
                  xs={0}
                  lg={6}
                  xl={7}
                  className={'login-img'}
                  style={{
                    backgroundImage: `url('/images/login-img.svg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                ></Grid>
                <Grid item md={5} xs={1} lg={6} xl={5} className={'loginBox'}>
                  <Grid
                    container
                    spacing={3}
                    columns={{ xs: 12, md: 12 }}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Grid item xs={11} md={11} order={{ xs: 1, lg: 1 }}>
                      <h2 className={'loginTitle'}>Login</h2>
                    </Grid>
                    <Grid item xs={11} md={11} className={'loginIconGroup'} order={{ xs: 6, lg: 2 }}>
                      <Button className={'loginIconButton'} variant={'outlined'}>
                        <img
                          style={{
                            width: '80%',
                            display: 'block',
                            margin: 'auto',
                          }}
                          src={'/images/apple-icon.svg'}
                        />
                      </Button>
                      <Button className={'loginIconButton'} variant={'outlined'}>
                        <img
                          style={{
                            width: '80%',
                            display: 'block',
                            margin: 'auto',
                          }}
                          src={'/images/google-icon.svg'}
                        />
                      </Button>
                    </Grid>

                    <Grid item className={'desktop'} xs={11} md={11} order={{ xs: 2, lg: 3 }}>
                      <div className={'login-dividing-line'}>
                        <div></div>
                        <p>Ou</p>
                        <div></div>
                      </div>
                    </Grid>
                    <Grid item xs={11} md={11} order={{ xs: 3, lg: 4 }}>
                      <TextField className={'loginInput'} label={'Email'} />
                    </Grid>
                    <Grid item xs={11} md={11} order={{ xs: 4, lg: 5 }}>
                      <TextField
                        className={'loginInput'}
                        style={{ borderRadius: '8' }}
                        type={'password'}
                        label={'Senha'}
                      />
                    </Grid>
                    <Grid item xs={6} md={11} order={{ xs: 5, lg: 6 }}>
                      <RadioGroup name={'controlled-radio-buttons-group'}>
                        <FormControlLabel
                          className={'rememberUser'}
                          value={''}
                          control={<Radio />}
                          label={'Lembrar usuário'}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={11} md={11} order={{ xs: 7, lg: 7 }}>
                      <Button className={'loginButton'} variant={'contained'} style={{ borderRadius: '8' }}>
                        Entrar
                      </Button>
                    </Grid>
                    <Grid className={'u'} item xs={5} md={11} justifyContent={'end'} order={{ xs: 5, lg: 8 }}>
                      <p className={'forgotPassword'}>Esqueceu a senha</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default Login
