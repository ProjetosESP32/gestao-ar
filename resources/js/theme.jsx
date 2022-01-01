import { createTheme } from '@mui/material/styles'

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
          marginLeft: 4,
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

export { theme }
