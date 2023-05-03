import React, { PropsWithChildren, memo } from 'react'
import { Loader } from 'ui'

interface IProps {
  error?: unknown
  isLoading?: boolean
}

export const PageLayout: React.FC<PropsWithChildren<IProps>> = memo(({ children, error, isLoading }) => {
  if (isLoading) return <Loader />

  // TODO parse error
  if (error) return <div>Unknown error</div>

  return (
    <div className='PageLayout'>{children}</div>
  )
})
