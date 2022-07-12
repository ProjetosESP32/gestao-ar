import { usePage } from '@inertiajs/inertia-react'
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BasePageProps } from '../interfaces/BasePageProps'
import { ChartContainer } from './ChartContainer'

interface ConsumptionNowProps {
  consumptionNow: { block: string; totalPotency: number }[]
}

type ConsumptionNowPageProps = BasePageProps<ConsumptionNowProps>

export const ConsumptionNow: FC = () => {
  const { consumptionNow } = usePage<ConsumptionNowPageProps>().props

  const data: ChartData<'doughnut', number[], string> = {
    labels: consumptionNow.map(({ block }) => `Bloco ${block.toUpperCase()}`),
    datasets: [
      {
        label: 'Blocos',
        data: consumptionNow.map(({ totalPotency }) => totalPotency),
        backgroundColor: ['#36a1ea', '#005b9f', '#0288d1'],
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