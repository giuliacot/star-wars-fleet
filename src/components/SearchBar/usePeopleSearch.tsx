import { useQuery } from 'react-query';

export const usePeopleSearch = ({ value }: { value: string }) => {
  return useQuery('peoplesearch', () =>
    fetch(`https://swapi.dev/api/people/?search=${value}`).then((res) =>
      res.json(),
    ),
  );
};
