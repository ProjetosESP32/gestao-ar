import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const UserButton = styled(Button)({
  fontWeight: 'bold',
  width: 'max-content',
  padding: '0.5rem 1.5rem',
  backgroundColor: '#3F51B5',
  fontSize: '0.8rem',
})

const AccountButton = styled(Button)({
  fontWeight: 'bold',
  width: 'max-content',
  padding: '0.5rem 2.5rem',
  backgroundColor: '#5D99C6',
  fontSize: '0.8rem',
  color: 'white!important',
  borderRadius: 32,
  margin: 'auto',
  [`&:hover`]: {
    backgroundColor: '#5D99C6',
  },
})

const ScheduleButton = styled(Button)({
  fontWeight: 'bold',
  width: 'max-content',
  padding: '0.3rem 1.25rem',
  backgroundColor: '#3F51B5',
  fontSize: '0.8rem',
  color: 'white!important',
  borderRadius: 8,
  textTransform: 'capitalize',
  [`&:hover`]: {
    backgroundColor: '#3F51B5',
  },
})
export { UserButton, AccountButton, ScheduleButton }
