import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React from 'react'
import { ConsumptionNow } from '@/components/ConsumptionNow'
import { DailyConsumption } from '@/components/DailyConsumption'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { MonthConsumption } from '@/components/MonthConsumption'

const Home = () => (
  <Container maxWidth='lg'>
    <Grid container spacing={2} flex={1} justifyContent='center'>
      <Grid item md={6} sm={12}>
        <ConsumptionNow />
      </Grid>
      <Grid item md={6} sm={12}>
        <DailyConsumption />
      </Grid>
      <Grid item sm={12}>
        <MonthConsumption />
      </Grid>
    </Grid>
  </Container>
)

export default withDrawer(Home)
