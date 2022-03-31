import { Grid, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Step from '@mui/material/Step'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import { styled } from '@mui/material/styles'
import { node } from 'prop-types'
import * as React from 'react'
import { MdSearch, MdPowerSettingsNew, MdBuild } from 'react-icons/md'
import { AccountButton, ScheduleButton } from '../../components/User/Buttons'
import { ControlInput, ControlLabel, ControlSelect, ControlTextArea } from '../../components/User/TextField.jsx'
import UserTitle from '../../components/User/Title.jsx'
import Icon from '../Icon/Index'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: 'none',
  boxShadow: '0 3px 6px #00000049',
  padding: '0.75rem 2.5rem',
  '&:focus': {
    border: 'none!important',
  },
}

const StyledModal = styled(Modal)(() => ({
  // backgroundColor: 'red',
  [`& div.MuiBackdrop-root`]: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
}))

const StyledControlSelect = styled(ControlSelect)(() => ({
  [`& option`]: {
    color: 'black',
    fontWeight: 'bold',
  },
}))

const Agenda = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ width: '100%' }}>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box style={style}>
          <UserTitle style={{ margin: '1.5rem 0' }} variant='p'>
            Evento
          </UserTitle>

          <Grid container justifyContent='space-between' columns={11} alignItems='center'>
            <Grid item xs={5}>
              <ControlLabel>Data</ControlLabel>
              <ControlInput type='date' />
            </Grid>
            <Grid item xs={5}>
              <ControlLabel>Ação</ControlLabel>
              <StyledControlSelect>
                <option>Ligar</option>
                <option>Desligar</option>
                <option>Manutenção</option>
              </StyledControlSelect>
            </Grid>
            <Grid item xs={5}>
              <ControlLabel>Início</ControlLabel>
              <StyledControlSelect>
                <option>00 am</option>
                <option>01 am</option>
                <option>02 am</option>
                <option>03 am</option>
              </StyledControlSelect>
            </Grid>
            <Grid item xs={5}>
              <ControlLabel>Fim</ControlLabel>
              <StyledControlSelect>
                <option>00 am</option>
                <option>01 am</option>
                <option>02 am</option>
                <option>03 am</option>
              </StyledControlSelect>
            </Grid>

            <Grid item xs={11}>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <AccountButton>Confirmar</AccountButton>
              </div>
            </Grid>
          </Grid>
        </Box>
      </StyledModal>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex' }}>
          <StyledDate type='date' />
          <Icon name={MdSearch} style={{ width: 32, height: 32, marginLeft: '0.5rem', fill: '#3F51B5' }}></Icon>
        </div>
        <ScheduleButton onClick={handleOpen}>+ Agendar</ScheduleButton>
      </div>
      <StyledStepperGroup>
        <Stepper activeStep={1} alternativeLabel connector={<InvisibleConector />}>
          <Step sx={{ fontWeight: 'bold', marginBottom: '1.1rem' }}>{'Sala'}</Step>
          {steps.map(label => (
            <Step sx={{ fontWeight: 'bold', marginBottom: '1.1rem' }} key={label}>
              {label}
            </Step>
          ))}
        </Stepper>

        <Stepper activeStep={7} alternativeLabel connector={<ColorlibConnector />}>
          <Step>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 32,
              }}
            >
              Sala1
            </p>
          </Step>

          {steps.map(label => (
            <Step sx={{ cursor: 'pointer' }} key={label} onClick={handleOpen}>
              <StepLabel StepIconComponent={ColorlibStepIcon} />
            </Step>
          ))}
        </Stepper>
      </StyledStepperGroup>
    </Box>
  )
}

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  border: '2px solid #5D99C6',
  zIndex: 1,
  color: '#fff',
  width: 32,
  height: 32,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  [`& svg`]: {
    width: '70%',
    height: '70%',
  },
}))

const StyledDate = styled('input')(() => ({
  border: 'none',
  padding: '0.5rem',
  // color: '#3F51B5',
  color: 'black',
  boxShadow: 'inset 0 3px 6px #00000049',
  borderRadius: '0.4rem',
  fontWeight: 'bold',
}))

function ColorlibStepIcon(props) {
  const icons = {
    4: <MdPowerSettingsNew style={{ fill: '#FF0000' }} />,
    2: <MdPowerSettingsNew style={{ fill: '#90CAF9' }} />,
    3: <MdBuild style={{ fill: '#002984' }} />,
  }

  return <ColorlibStepIconRoot>{icons[String(props.icon)]}</ColorlibStepIconRoot>
}
const StyledStepperGroup = styled('div')(() => ({
  boxShadow: '0 3px 6px #00000049',
  padding: '1rem 0',
  borderRadius: '0.5rem',
}))

ColorlibStepIcon.propTypes = {
  /**
   * The label displayed in the step icon.
   */
  icon: node,
}

const InvisibleConector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'rgba(0,0,0,0)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'rgba(0,0,0,0)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'rgba(0,0,0,0)',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#5D99C6',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#5D99C6',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const steps = ['00am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am']

export default Agenda
