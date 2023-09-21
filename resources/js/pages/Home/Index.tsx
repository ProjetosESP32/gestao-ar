import { ChartContainer } from '@/components/ChartContainer'
import { DailyConsumption } from '@/components/DailyConsumption'
import { withDrawer } from '@/components/Drawer'
import { MonthConsumption } from '@/components/MonthConsumption'
import { BasePageProps } from '@/interfaces/BasePageProps'
import { usePage } from '@inertiajs/inertia-react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'

interface AverageConsumptionProps {
  averageConsumption: { block: string; potency: number }[]
}
type AverageConsumptionPageProps = BasePageProps<AverageConsumptionProps>

export const AverageConsumption: FC = () => {
  const {
    palette: { primary, secondary },
  } = useTheme()
  const { averageConsumption } = usePage<AverageConsumptionPageProps>().props

  const data: ChartData<'doughnut', number[], string> = {
    labels: averageConsumption.map(({ block }) => `Bloco ${block.toUpperCase()}`),
    datasets: [
      {
        label: 'Blocos',
        data: averageConsumption.map(({ potency }) => potency),
        backgroundColor: [primary.dark, secondary.dark, primary.light, secondary.light],
        borderWidth: 0,
      },
    ],
  }

  return (
    <ChartContainer title='Consumo atual médio (kWh)'>
      <Doughnut data={data} />
    </ChartContainer>
  )
}

Chart.register(ArcElement, Tooltip, Legend)

const Home = () => (
  <Container maxWidth='lg'>
    <Grid container spacing={2} flex={1} justifyContent='center'>
      <Grid item md={6} sm={12}>
        <AverageConsumption />
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
