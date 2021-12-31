import { createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#002984',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 32,
          width: '100%',
          paddingTop: 16,
          paddingBottom: 16,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 32,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginLeft: 8,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
  },
})

const useStyles = makeStyles({
  root: {
    height: '100%',
    maxHeight: '100vh',
  },

  loginWave: {
    width: '100vw',
    position: 'fixed',
    zIndex: '-1',
    top: '0',
  },

  loginContainer: {
    background: 'white',
    width: '62vw',
    height: 'max-content',
    margin: 'auto',
    marginTop: '13vh',
    borderRadius: '20px',
    display: 'flex',
    border: '1px solid gray',
    maxWidth: 1200,
  },
  loginTitle: {
    textTransform: 'uppercase',
    color: '#90CAF9',
    textAlign: 'center',
  },
  loginIconGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '50%',
    margin: 'auto',
  },
})

export { useStyles, theme }
