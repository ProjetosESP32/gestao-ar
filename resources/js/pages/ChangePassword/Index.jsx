import { ThemeProvider, Box, Button, TextField, Grid, RadioGroup, Radio, FormControlLabel } from '@mui/material'
import React from 'react'
import '../Login/styles.css'
import { theme } from '../../theme.jsx'

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <div className={'root'}>
        <img src={'/images/login-wave.svg'} className={'loginWave'} />
        <div className={'loginContainer'}>
          <Grid container columns={{ xs: 1, md: 12, lg: 12, xl: 12 }}>
            <Grid
              item
              md={7}
              xs={0}
              xl={8}
              style={{
                backgroundImage: `url('/images/login-img.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
              }}
            ></Grid>
            <Grid item md={5} xs={1} xl={4} style={{ padding: '2rem 0' }}>
              <Grid container spacing={2} columns={{ xs: 1, lg: 1 }}>
                <Grid item xs={1} lg={1}>
                  <h2 className={'loginTitle'}>Login</h2>
                </Grid>
                <Grid item xs={1} lg={1}>
                  <div className={'loginIconGroup'}>
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
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={3} columns={{ xs: 12, md: 12 }} alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={11} md={11}>
                  <div className={'login-dividing-line'}>
                    <div></div>
                    <p>Ou</p>
                    <div></div>
                  </div>
                </Grid>
                <Grid item xs={11} md={11}>
                  <TextField label={'Email'} />
                </Grid>
                <Grid item xs={11} md={11}>
                  <TextField style={{ borderRadius: '8' }} type={'password'} label={'Senha'} />
                </Grid>

                <Grid item xs={11} md={11}>
                  <RadioGroup name={'controlled-radio-buttons-group'}>
                    <FormControlLabel value={'female'} control={<Radio />} label={'Lembrar usuário'} />
                  </RadioGroup>
                </Grid>
                <Grid item xs={11} md={11}>
                  <Button variant={'contained'} style={{ borderRadius: '8' }}>
                    Entrar
                  </Button>
                </Grid>
                <Grid item xs={11} md={11} justifyContent={'end'}>
                  <p className={'forgot-password'}>Esqueceu a senha</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login
