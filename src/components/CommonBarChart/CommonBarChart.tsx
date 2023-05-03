import React, { useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts'
import type { Formatter } from 'recharts/types/component/DefaultLegendContent'
import styles from './CommonBarChart.module.scss'

export interface IBarChartCommonProps {
  label: string | number
  formatLabel?: (label: string) => string
}

interface IProps<T> {
  keys: string[]
  items: T[]
  onBarClicked?: (key: string, data: T) => void
  formatLegend?: Formatter
}

const margin = {
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
}

const CHART_COLORS = [
  'red', 'blue',
]

export const CommonBarChart = <T,>(props: IProps<T>) => {
  const { onBarClicked, items, keys, formatLegend } = props

  const handleBarClicked = useCallback((key: string) => (data: T) => {
    onBarClicked?.(key, data)
  }, [onBarClicked])

  return (
    <div className={styles.CommonBarChart}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={items}
          margin={margin}
        >
          <XAxis dataKey='label' />
          <YAxis />
          <Legend formatter={formatLegend} />

          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              onClick={handleBarClicked(key)} className={styles.CommonBarChart__bar}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
