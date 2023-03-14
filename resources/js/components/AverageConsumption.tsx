import { usePage } from '@inertiajs/inertia-react'
import { useTheme } from '@mui/material/styles'
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BasePageProps } from '../interfaces/BasePageProps'
import { ChartContainer } from './ChartContainer'

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
