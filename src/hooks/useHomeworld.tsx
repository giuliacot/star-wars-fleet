import React from 'react'
import {useQuery} from 'react-query'

type HomeworldProps = {
  url: string
}

type HomeworldResult = {
  isLoading: boolean
  error: unknown
  planetName: string
}

export const useHomeworld = ({ url } : HomeworldProps) : HomeworldResult  => {
  const { isLoading, error, data } = useQuery(url, () =>
    fetch(
      url,
    ).then((res) => res.json())
  );

  return {
    isLoading, error, planetName: data?.name
  }

}