import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { IDetailedData } from 'summary'
import { prepareDetailsData, useProductsQuery } from 'services/products'
import { getFactoryNameByKey } from 'utils/factory'
import { getMonthShortByNumber } from 'utils/datetime'
import { CommonPieChart } from 'components/CommonPieChart'
import { PageLayout } from 'components/PageLayout'
import styles from './Details.module.scss'


interface IParams {
  [key: string]: string;
  factoryId: string
  monthNumber: string
}

const Details: React.FC = () => {
  const { factoryId, monthNumber } = useParams<IParams>()

  const { data: products, error, isFetching } = useProductsQuery()

  const chartItems = useMemo<IDetailedData[]>(() => {
    if (!products?.length) {
      return []
    }

    return prepareDetailsData(products, factoryId, monthNumber)
  }, [products])

  const factoryName = getFactoryNameByKey(factoryId, 'Фабрики')
  const monthName = getMonthShortByNumber(monthNumber)

  if (error || isFetching) {
    return <PageLayout error={error} isLoading={isFetching} />
  }

  return (
    <div className={styles.Details}>
      <h1>Статистика по продукции {factoryName} за {monthName}</h1>

      <CommonPieChart
        items={chartItems}
      />
    </div>
  )
}

export default memo(Details)
