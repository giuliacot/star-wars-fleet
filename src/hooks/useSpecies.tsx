import { useQuery } from 'react-query';

type SpeciesProps = {
  url: string;
};

export const useSpecies = ({ url }: SpeciesProps) => {
  const { isLoading, error, data } = useQuery(url, () =>
    fetch(url).then((res) => res.json()),
  );

  return {
    isLoading,
    error,
    speciesName: data?.name,
  };
};
