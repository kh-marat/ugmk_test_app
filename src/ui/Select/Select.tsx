import React, { forwardRef, memo, useCallback } from 'react'
import type { IOption } from './types'
import styles from './Select.module.scss'

interface IProps {
  value: string | number | undefined
  options: IOption[]
  placeholder?: string
  onChange: (value: IOption['value']) => void
}

export const Select = memo(
  forwardRef<HTMLSelectElement, IProps>(({ value, options, onChange }, ref) => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      return onChange(e.target.value)
    }, [onChange])

    return (
      <select ref={ref} className={styles.Select} onChange={handleChange} value={value}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    )
  }),
)
