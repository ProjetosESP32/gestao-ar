import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Step from '@mui/material/Step'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import PropTypes, { node } from 'prop-types'

import * as React from 'react'
import { MdRequestQuote } from 'react-icons/md'

const Agenda = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none!important',
    boxShadow: 24,
    p: 4,
  }
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ width: '100%' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '2rem',
        }}
      >
        <StyledDate type='date' />
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
    1: <MdRequestQuote />,
    2: <MdRequestQuote />,
    3: <MdRequestQuote />,
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
