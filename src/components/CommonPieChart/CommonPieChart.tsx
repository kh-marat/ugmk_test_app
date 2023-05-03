import React, { memo } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { Formatter } from 'recharts/types/component/DefaultLegendContent'
import styles from './CommonPieChart.module.scss'

export interface IPieChartData {
  name: string | number
  formatLabel?: (label: string) => string
  value: number
}

interface IProps {
  items: IPieChartData[]
  formatLegend?: Formatter
}

const CHART_COLORS = [
  'green', 'orange',
]

export const CommonPieChart: React.FC<IProps> = memo((props) => {
  const { items, formatLegend } = props

  return (
    <div className={styles.CommonPieChart}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={500}>
          <Pie
            dataKey='value'
            data={items}
            cx='50%'
            cy='50%'
            outerRadius={150}
            labelLine={false}
            label
          >
            {items.map((item, index) => (
              <Cell key={`cell-${item.name}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Legend formatter={formatLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
})
