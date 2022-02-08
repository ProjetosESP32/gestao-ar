import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#002984',
    },
  },

  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: 'Linhas por página:',
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais que ${to}`}`,
      },
    },

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
