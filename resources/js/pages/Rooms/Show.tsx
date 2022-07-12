import { DailyConsumption } from '@/components/DailyConsumption'
import { withDrawer } from '@/components/Drawer/withDrawer'
import { MonthConsumption } from '@/components/MonthConsumption'
import { RoomAir } from '@/components/RoomAir'
import { RoomInfo } from '@/components/RoomInfo'
import { RoomStatus } from '@/components/RoomStatus'
import { Container, Grid } from '@mui/material'
import React, { FC } from 'react'

const Show: FC = () => (
  <Container maxWidth='lg'>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RoomInfo />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RoomAir />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RoomStatus />
      </Grid>
      <Grid item xs={12}>
        <DailyConsumption />
      </Grid>
      <Grid item xs={12}>
        <MonthConsumption />
      </Grid>
    </Grid>
  </Container>
)

export default withDrawer(Show)
