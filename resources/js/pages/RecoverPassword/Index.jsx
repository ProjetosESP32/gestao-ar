import { ThemeProvider, Box, Button, TextField, Grid, RadioGroup, Radio, FormControlLabel, Link } from '@mui/material'
import React from 'react'
import '../Login/styles.css'
import '../ChangePassword/style.css'
import { theme } from '../../theme.jsx'

function RecoverPassword() {
  return (
    <ThemeProvider theme={theme}>
      <div className={'root'}>
        <img src={'/images/recover-pass-wave.svg'} className={'changePassWave'} />

        <Grid spacing={1} container columns={{ xl: 12, lg: 12 }} justifyContent={'center'}>
          <Grid item xl={7} lg={8}>
            <div
              className={'loginContainer'}
              style={{
                paddingTop: '6vh',
                paddingBottom: '11vh',
                backgroundImage: `url('/images/recover-pass-img.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'left',
              }}
            >
              <Grid
                spacing={4}
                container
                columns={{ xs: 1, md: 12, lg: 12, xl: 12 }}
                style={{ marginLeft: '0px' }}
                justifyContent={'space-evenly'}
              >
                <Grid item md={6} xs={1} xl={5}>
                  <Grid container spacing={2} columns={{ xs: 1, lg: 1 }}>
                    <Grid item xs={1} lg={1}>
                      <h2 className={'resetPassTitle'}>Esqueceu Sua Senha?</h2>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={3}
                    columns={{ xs: 12, md: 12 }}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Grid item xs={11} md={11}>
                      <p className={'resetPassText'}>
                        Por favor, insira o endereço de e-mail associado à sua conta e nós lhe enviaremos um link para
                        redefinir sua senha.
                      </p>
                    </Grid>
                    <Grid item xs={11} md={11}>
                      <TextField style={{ borderRadius: '8' }} type={'email'} label={'Email'} />
                    </Grid>

                    <Grid item xs={11} md={11}>
                      <Button variant={'contained'} style={{ borderRadius: '8' }}>
                        Enviar
                      </Button>
                    </Grid>
                    <Grid item xs={11} md={11}>
                      <Link className={'recoverPassBackButton'} component={'button'} variant={'body2'}>
                        Voltar
                      </Link>
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

export default RecoverPassword
