import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const AccountTextField = styled(TextField)(({ theme }) => ({
  ...theme.typography.body2,
  [`& fieldset`]: {
    borderRadius: 8,
    borderColor: '#90CAF9',
    boxShadow: 'inset 0 3px 6px rgba(77, 24, 24, 0.1)',
  },
  [`& input`]: {
    '&::placeholder': {
      color: '#90CAF9',
    },
    borderRadius: 8,
  },
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  width: '100%',
  display: 'flex',
  '& label.Mui-focused': {
    color: '#90CAF9',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#90CAF9',
      boxShadow: 'none',
    },
  },
}))

const ControlInput = styled('input')(
  ({ theme }) => `
  width:100%;
  color: black;
  text-align: left;
  font-weight:bold;
  border: none;
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(1.4)};
  box-shadow: inset 0 3px 6px 0 #00000029;
  &:hover{
    border:none;
  }
  &:before{
    border:none;
  }
  &:after{
    border:none;
  }
  &:disabled {
    background-color: #F7F7F7;
  }
`,
)
const ControlTextArea = styled('textarea')(
  ({ theme }) => `
  width:100%;
  color: black;
  text-align: left;
  font-weight:bold;
  border: none;

  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(1.2)};
  box-shadow: inset 0 0.24rem 0.48rem #00000029;
  &:hover{
    border:none;
  }
  &:before{
    border:none;
  }
  &:after{
    border:none;
  }
  &:disabled {
    background-color: #F7F7F7;
  }
`,
)

const ControlSelect = styled('select')(
  ({ theme }) => `
  width:100%;
  color: black;
  text-align: left;
  font-weight:bold;
  border: none;
  background-color:white;
  color:'#90CAF9';
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(1.2)};
  box-shadow: inset 0 0.24rem 0.48rem #00000029;
  &:hover{
    border:none;
  }
  &:before{
    border:none;
  }
  &:after{
    border:none;
  }
  &:disabled {
    background-color: #F7F7F7;
  }

`,
)

const ControlLabel = styled(Typography)(() => ({
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#90CAF9',
  margin: '0.2rem 0',
}))

export { AccountTextField, ControlInput, ControlTextArea, ControlLabel, ControlSelect }
