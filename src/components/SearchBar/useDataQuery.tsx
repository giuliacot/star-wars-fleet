import { useQuery } from 'react-query';

export const useDataQuery = ({
  kind,
  value,
  dataListName,
}: {
  kind: 'people' | 'starships';
  value: string;
  dataListName: string;
}) => {
  return useQuery(dataListName, () =>
    fetch(`https://swapi.dev/api/${kind}/?search=${value}`).then((res) =>
      res.json(),
    ),
  );
};
