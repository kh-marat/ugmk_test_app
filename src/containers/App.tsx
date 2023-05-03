import React, { lazy, memo, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Loader } from 'ui'
import { SUMMARY, DETAILS } from 'constants/routes'
import { AppContainer } from './AppContainer'

const Summary = lazy(() => import('views/Summary/Summary'))
const Details = lazy(() => import('views/Details/Details'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route element={<AppContainer />}>
                <Route path={SUMMARY} element={<Summary />} />
                <Route path={DETAILS} element={<Details />} />
                <Route path={'*'} element={<Navigate to={SUMMARY} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </React.StrictMode>
  )
}

export default memo(App)
