import React, {FunctionComponent, Props, PropsWithoutRef, PropsWithRef, ReactNode} from 'react'
import style from './Card.module.css'

type Card = {
  name: string,
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Card: FunctionComponent<Card> = ({children, name, className}) => {
  return (
    <div className={`${style.wrapper} ${className}`}>
      <h5 className={style.name}>{name}</h5>
      {children}
    </div>
  )
}