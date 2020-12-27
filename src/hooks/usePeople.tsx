import React from 'react';
import { useQuery } from 'react-query';
import { useHomeworld } from './useHomeworld';

export type People = {
  name: string;
  gender: string;
  birthYear: string;
  species: string[];
  homeworld: string;
};

type ResultPeople = { isLoading: boolean; people: [People]; error: unknown };

export const usePeople = (url?: string): ResultPeople => {
  const { isLoading, error, data, refetch } = useQuery('people', () =>
    fetch(url ? url : 'https://swapi.dev/api/people').then((res) => res.json()),
  );

  return {
    isLoading,
    error,
    people: data?.results,
  };
};
