import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const AccountTextField = styled(TextField)(({ theme }) => ({
  ...theme.typography.body2,
  [`& fieldset`]: {
    borderRadius: 8,
    borderColor: '#90CAF9',
  },
  [`& input`]: {
    '&::placeholder': {
      color: '#90CAF9',
    },
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
    },
  },
}))

export default AccountTextField
