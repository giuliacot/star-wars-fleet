import React, {FunctionComponent, ReactNode} from 'react'
import { useSpecies } from '../../../hooks/useSpecies'

type Species = {
  url: string,
} & React.HTMLAttributes<HTMLDivElement>

export const Species: FunctionComponent<Species> = ({children, url, className}) => {

  const {isLoading, error, speciesName} = useSpecies({url})

  if(isLoading) return <div>Loading</div>
  if(error) return <div>Error</div>
  return (
    <div className={className}>
      <span>Species: </span>
      <span>{speciesName}</span>
    </div>
  )
}