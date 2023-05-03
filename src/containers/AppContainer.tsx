import React, { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from 'ui'

export const AppContainer: React.FC = memo(() => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  )
})
