import type { IBarChartCommonProps } from 'components/CommonBarChart'
import { EProduct } from 'constants/product'

export interface ISummaryData extends IBarChartCommonProps {
  [key: `factory${number}`]: number
  month: number | indefined
}

export interface IDetailedData {
  name: string
  value: number
}
