import groupBy from 'lodash.groupby'
import orderBy from 'lodash.orderby'
import { useQuery } from '@tanstack/react-query'
import type { IDetailedData, ISummaryData } from 'summary'
import type { IProduct } from 'product'
import { EProduct, PRODUCT_LABELS } from 'constants/product'
import { BASE_API_URL } from 'constants/config'
import { KG_IN_TON } from 'constants/common'
import { getMonthNumber, getMonthShort } from 'utils/datetime'
import { capitalize } from 'utils/format'

export const getProductsRequest = async () => {
  return await fetch(`${BASE_API_URL}/products`).then((res) => res.json())
}

export const useProductsQuery = () => {
  return useQuery<IProduct[], unknown>(['products'], () => getProductsRequest(), {
    placeholderData: [],
    keepPreviousData: true,
    staleTime: 60 * 1000,
  })
}

const dateFormat = 'D/M/YYYY'
const dateFormatFn = getMonthShort(dateFormat)
const getMonthFn = getMonthNumber(dateFormat)

const formatWeightValue = (val: number) => {
  if (!val) {
    return val
  }

  return Math.round((val ?? 0) / KG_IN_TON)
}

export const prepareSummaryData = (items: IProduct[], filterProductKey: EProduct | ''): ISummaryData[] => {
  const groupedData = groupBy<IProduct>(items.filter(i => i.date), (item) => dateFormatFn(item.date))
  
  const chartData = Object.values(groupedData).map((group: IProduct[]) => {
    const initialValue: ISummaryData = {
      label: capitalize(dateFormatFn(group[0].date)),
      month: getMonthFn(group[0].date),
    }

    const factoryIds = new Set<number>()

    const summedData = group.reduce((memo, item) => {
      if (!item.factory_id) {
        return memo
      }

      memo[`factory${item.factory_id}`] ||= 0

      if (!filterProductKey || filterProductKey === EProduct.PRODUCT_1) {
        memo[`factory${item.factory_id}`] += (item[EProduct.PRODUCT_1] ?? 0)
      }

      if (!filterProductKey || filterProductKey === EProduct.PRODUCT_2) {
        memo[`factory${item.factory_id}`] += (item[EProduct.PRODUCT_2] ?? 0)
      }

      factoryIds.add(item.factory_id)

      return memo
    }, initialValue)

    factoryIds.forEach(id => {
      summedData[`factory${id}`] = formatWeightValue(summedData[`factory${id}`])
    })

    return summedData
  })

  return orderBy(chartData, 'month')
}

export const prepareDetailsData = (
  products: IProduct[],
  factoryId: string | number | undefined,
  monthNumber: string | number | undefined,
): IDetailedData[] => {
  if (!factoryId || !monthNumber) {
    return []
  }

  const parsedFactoryId = parseInt(factoryId.toString(), 10)
  const parsedMonthNumber = parseInt(monthNumber.toString(), 10)

  const initialValue: Record<EProduct, number> = {
    [EProduct.PRODUCT_1]: 0,
    [EProduct.PRODUCT_2]: 0,
  }

  const summedData = products.reduce((memo, item) => {
    if (item.factory_id !== parsedFactoryId || getMonthFn(item.date) !== parsedMonthNumber) {
      return memo
    }

    memo[EProduct.PRODUCT_1] += item.product1 ?? 0
    memo[EProduct.PRODUCT_2] += item.product2 ?? 0

    return memo
  }, initialValue)

  return Object.values(EProduct).map(key => ({
    name: PRODUCT_LABELS[key],
    value: formatWeightValue(summedData[key])
  }))
}
