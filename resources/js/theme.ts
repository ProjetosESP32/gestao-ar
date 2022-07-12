import { createTheme, responsiveFontSizes, Palette } from '@mui/material/styles'

export const createAppTheme = (mode: Palette['mode']) => {
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#6c63ff',
        light: '#a491ff',
        dark: '#2838cb',
      },
      secondary: {
        main: '#90caf9',
        light: '#c3fdff',
        dark: '#5d99c6',
      },
    },

    typography: {
      fontFamily: 'Montserrat, sans-serif',
    },

    components: {
      MuiTablePagination: {
        defaultProps: {
          labelRowsPerPage: 'Itens por página:',
          labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais que ${to}`}`,
        },
      },

      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
      },

      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
        styleOverrides: {
          contained: {
            borderRadius: '9999px',
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '9999px',
          },
        },
      },
    },
  })

  return responsiveFontSizes(theme)
}
