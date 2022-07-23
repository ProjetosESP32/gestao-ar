import { usePage } from '@inertiajs/inertia-react'
import { useTheme } from '@mui/material/styles'
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BasePageProps } from '../interfaces/BasePageProps'
import { ChartContainer } from './ChartContainer'

interface ConsumptionNowProps {
  consumptionNow: { block: string; potency: number }[]
}

type ConsumptionNowPageProps = BasePageProps<ConsumptionNowProps>

export const ConsumptionNow: FC = () => {
  const {
    palette: { primary, secondary },
  } = useTheme()
  const { consumptionNow } = usePage<ConsumptionNowPageProps>().props

  const data: ChartData<'doughnut', number[], string> = {
    labels: consumptionNow.map(({ block }) => `Bloco ${block.toUpperCase()}`),
    datasets: [
      {
        label: 'Blocos',
        data: consumptionNow.map(({ potency }) => potency),
        backgroundColor: [primary.dark, secondary.dark, primary.light, secondary.light],
        borderWidth: 0,
      },
    ],
  }

  return (
    <ChartContainer title='Consumo atual (kWh)'>
      <Doughnut data={data} />
    </ChartContainer>
  )
}

Chart.register(ArcElement, Tooltip, Legend)
