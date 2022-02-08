import { useForm, usePage } from '@inertiajs/inertia-react'
import { Button, Grid, TextField, useTheme } from '@mui/material'
import React from 'react'
import '../Auth/styles.css'
import './style.css'

const ChangePassword = () => {
  const { url } = usePage()
  const { data, setData, post, errors } = useForm({
    password: '',
    passwordConfirmation: '',
  })
  const theme = useTheme()

  const handleChange = e => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = async () => {
    await post(url)
  }

  return (
    <div className='root'>
      <img src='/images/change-pass-wave.svg' className='changePassWave desktop' />

      <Grid spacing={1} container columns={{ xl: 12, lg: 12 }} justifyContent='center'>
        <Grid item xl={7} lg={8}>
          <div className='loginContainer' style={{ paddingTop: '6vh', paddingBottom: '7vh' }}>
            <Grid
              container
              columns={{ xs: 12, md: 12 }}
              justifyContent='space-around'
              style={{ position: 'fixed', top: theme.spacing(2) }}
            >
              <Grid item xs={11} md={11}>
                <img className='logoContainer' src='/images/logo.svg' />
              </Grid>
            </Grid>
            <Grid container columns={{ xs: 1, md: 12, lg: 12, xl: 12 }}>
              <Grid
                rowSpacing={1}
                item
                md={6}
                xs={0}
                xl={6}
                lg={6}
                style={{
                  backgroundImage: `url('/images/change-pass-img.svg')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                }}
                className='desktop'
              ></Grid>
              <Grid item md={6} xs={1} xl={5}>
                <Grid container spacing={2} columns={{ xs: 1, lg: 1 }}></Grid>

                <Grid container spacing={3} columns={{ xs: 12, md: 12 }} alignItems='center' justifyContent='center'>
                  <Grid item xs={11} lg={11}>
                    <h2 className='resetPassTitle'>Informe Sua Nova Senha!</h2>
                  </Grid>
                  <Grid item xs={11} md={11}>
                    <p className='resetPassText'>Por favor, preencha os campos abaixo com a nova senha.</p>
                  </Grid>
                  <Grid item xs={11} md={11}>
                    <TextField
                      className='loginInput'
                      style={{ borderRadius: '8' }}
                      type='password'
                      label='Senha'
                      value={data.password}
                      name='password'
                      onChange={handleChange}
                      error={errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={11} md={11}>
                    <TextField
                      className='loginInput'
                      style={{ borderRadius: '8' }}
                      type='password'
                      label='Confirmar Senha'
                      value={data.passwordConfirmation}
                      name='passwordConfirmation'
                      onChange={handleChange}
                      error={errors.passwordConfirmation}
                      helperText={errors.passwordConfirmation}
                    />
                  </Grid>
                  <Grid item xs={11} md={11}>
                    <Button
                      className='loginButton'
                      variant='contained'
                      style={{ borderRadius: '8' }}
                      onClick={handleSubmit}
                    >
                      Confirmmar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default ChangePassword
