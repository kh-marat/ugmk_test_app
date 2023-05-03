import React, { type PropsWithChildren, forwardRef, memo } from 'react'
import cn from 'classnames'
import styles from './Card.module.scss'

interface IProps {
  className?: string
}

export const Card: React.FC<PropsWithChildren<IProps>> = memo(
  forwardRef<HTMLDivElement, PropsWithChildren<IProps>>(({ children, className, ...props }, ref) => {
    const wrapperClassName = cn(styles.Card, className)

    return (
      <div className={wrapperClassName} ref={ref} { ...props }>
        {children}
      </div>
    )
  }),
)
