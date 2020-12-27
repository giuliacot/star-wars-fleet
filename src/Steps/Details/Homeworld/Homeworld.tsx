import React, {FunctionComponent, ReactNode} from 'react'
import { useHomeworld } from '../../../hooks/useHomeworld'
import style from './Homeworld.module.css'

type Homeworld = {
  url: string,
} & React.HTMLAttributes<HTMLDivElement>

export const Homeworld: FunctionComponent<Homeworld> = ({children, url, className}) => {

  const {isLoading, error, planetName} = useHomeworld({url})

  if(isLoading) return <div>Loading</div>
  if(error) return <div>Error</div>
  return (
    <div className={className}>
      <span>Homeworld: </span>
      <span>{planetName}</span>
    </div>
  )
}