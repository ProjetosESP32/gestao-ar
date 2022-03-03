import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  desktop: {
    [theme.breakpoints.up('sm')]: {
      //my styles
    },
    [theme.breakpoints.down('md')]: {
      display: 'none!important',
    },
    [theme.breakpoints.up('lg')]: {
      //my styles
    },
    [theme.breakpoints.up('xl')]: {
      //my styles
    },
  },
  mobile: {
    [theme.breakpoints.up('sm')]: {
      //my styles
    },
    [theme.breakpoints.up('md')]: {
      display: 'none!important',
    },
    [theme.breakpoints.up('lg')]: {
      //my styles
    },
    [theme.breakpoints.up('xl')]: {
      //my styles
    },
  },
}))
