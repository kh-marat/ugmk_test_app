import React, { memo } from 'react'

interface IProps { }

export const Loader: React.FC<IProps> = memo(() => {
  return (
    <div className='Loader'>Loading...</div>
  )
})
