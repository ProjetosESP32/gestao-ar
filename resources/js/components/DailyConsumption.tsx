import { usePage } from '@inertiajs/inertia-react'
import {
  CategoryScale,
  Chart,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React, { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { BasePageProps } from '../interfaces/BasePageProps'
import { ChartContainer } from './ChartContainer'

interface DailyConsumptionProps {
  dailyConsumption: { hour: string; totalPotency: number }[]
}

type DailyConsumptionPageProps = BasePageProps<DailyConsumptionProps>

export const DailyConsumption: FC = () => {
  const { dailyConsumption } = usePage<DailyConsumptionPageProps>().props

  const data: ChartData<'line', number[], string> = {
    labels: dailyConsumption.map(({ hour }) => hour),
    datasets: [
      {
        label: 'Consumo',
        data: dailyConsumption.map(({ totalPotency }) => totalPotency),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235)',
      },
    ],
  }

  return (
    <ChartContainer title='Consumo diário (kWh)'>
      <Line options={lineOptions} data={data} />
    </ChartContainer>
  )
}

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0,0,0,0)',
      },
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0)',
      },
    },
  },
} as const

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
