import { usePage } from '@inertiajs/inertia-react'
import { useTheme } from '@mui/material/styles'
import { BarElement, CategoryScale, Chart, ChartData, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Bar } from 'react-chartjs-2'
import { BasePageProps } from '../interfaces/BasePageProps'
import { getMonthsByNumber } from '../utils/getMonthsByNumber'
import { ChartContainer } from './ChartContainer'

interface MonthConsumptionProps {
  monthConsumption: { month: number; totalPotency: number }[]
}

type MonthConsumptionPageProps = BasePageProps<MonthConsumptionProps>

export const MonthConsumption: FC = () => {
  const {
    palette: { primary, secondary },
  } = useTheme()
  const { monthConsumption } = usePage<MonthConsumptionPageProps>().props

  const data: ChartData<'bar', number[], string> = {
    labels: monthConsumption.map(({ month }) => getMonthsByNumber(month - 1)),
    datasets: [
      {
        label: 'Consumo',
        data: monthConsumption.map(({ totalPotency }) => totalPotency),
        backgroundColor: [primary.dark, secondary.dark, primary.light, secondary.light],
      },
    ],
  }

  return (
    <ChartContainer title='Consumo Mensal (kWh)'>
      <Bar options={barOptions} data={data} />
    </ChartContainer>
  )
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
