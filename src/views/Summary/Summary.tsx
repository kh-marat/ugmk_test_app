import React, { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ISummaryData } from 'summary'
import { Card, Select, type IOption } from 'ui'
import { prepareSummaryData, useProductsQuery } from 'services/products'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { EProduct, LS_PRODUCT_KEY } from 'constants/product'
import { EFactory } from 'constants/factory'
import { DETAILS } from 'constants/routes'
import { getFactoryIdByKey, getFactoryNameByKey } from 'utils/factory'
import { getRoute } from 'utils/route'
import { CommonBarChart } from 'components/CommonBarChart'
import { PageLayout } from 'components/PageLayout'
import styles from './Summary.module.scss'

const filtertOptions: IOption[] = [
  { label: 'Вся продукция', value: '' },
  { label: 'Продукт 1', value: EProduct.PRODUCT_1 },
  { label: 'Продукт 2', value: EProduct.PRODUCT_2 },
]

const chartKeys = [EFactory.FACTORY_1, EFactory.FACTORY_2]

const formatChartLegend = (key: string) => {
  const prefix = 'Фабрика'

  return getFactoryNameByKey(key, prefix)
}

const Summary: React.FC = () => {
  const navigate = useNavigate()
  const [filterKey, setFilterKey] = useLocalStorage<EProduct | ''>(LS_PRODUCT_KEY, '')

  const { data: products, error, isFetching } = useProductsQuery()

  const handleFilterChanged = useCallback((value: string | number | undefined) => {
    setFilterKey(value as EProduct || '')
  }, [setFilterKey])

  const handleBarClicked = useCallback((key: string, data: ISummaryData) => {
    const factoryId = getFactoryIdByKey(key as EFactory)
    const monthNumber = data.month

    if (!factoryId) {
      return console.error('Unknown error: no factory id')
    }

    navigate(getRoute(DETAILS, { factoryId, monthNumber }))
  }, [navigate])

  const chartItems = useMemo<ISummaryData[]>(() => {
    if (!products?.length) {
      return []
    }

    return prepareSummaryData(products, filterKey)
  }, [products, filterKey])

  if (error || isFetching) {
    return <PageLayout error={error} isLoading={isFetching} />
  }

  return (
    <PageLayout>
      <div className={styles.Summary}>
        <Card className={styles.Summary__filter}>
          <div className={styles.Summary__wrapper}>
            Фильтр по типу продукции  
            <Select value={filterKey} options={filtertOptions} onChange={handleFilterChanged} />
          </div>
        </Card>

        <Card>
          <CommonBarChart<ISummaryData>
            items={chartItems}
            keys={chartKeys}
            onBarClicked={handleBarClicked}
            formatLegend={formatChartLegend}
          />
        </Card>
      </div>
    </PageLayout>
  )
}

export default memo(Summary)
