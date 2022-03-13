import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const LoginTextField = styled(TextField)(({ theme }) => ({
  ...theme.typography.body2,
  [`& fieldset`]: {
    borderRadius: '32px',
    borderColor: '#90CAF9',
    boxShadow: 'inset 0 3px 6px rgba(77, 24, 24, 0.1)',
  },
  [`& input`]: {
    '&::placeholder': {
      color: '#90CAF9',
    },
    borderRadius: '32px',
  },
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

export { LoginTextField }
