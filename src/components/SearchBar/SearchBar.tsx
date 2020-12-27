import React, {
  FunctionComponent,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { People } from '../../Steps/Details/People/People';
import { useFleetContext } from '../../Steps/fleetContext';
import { People as SwapiPeople } from '../../types/swapi';
import { Input } from '../Input/Input';

type SearchBarProps = {
  label: string;
  kind: 'people' | 'starships' | 'vehicles' | 'species' | 'planets' | 'films';
} & React.HTMLAttributes<HTMLInputElement | HTMLDataListElement>;

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  label,
  kind,
}) => {
  const { updateFleet, fleet } = useFleetContext();
  const dataListName = label.trim().toLowerCase();
  const [value, setValue] = useState(fleet.commander?.name || '');
  const [possibleValues, setPossibleValues] = useState<SwapiPeople[]>([]);
  const { isLoading, error, data, refetch } = useQuery('search', () =>
    fetch(`https://swapi.dev/api/${kind}/?search=${value}`).then((res) =>
      res.json(),
    ),
  );

  // Refetching base on the new input value
  useEffect(() => {
    refetch();
  }, [value]);

  // Set commander only when it is choosen one from the list
  useEffect(() => {
    if (data?.results) {
      setPossibleValues(data.results);
    }
  }, [data]);

  if (error) throw error;

  if (isLoading) <div>Loading</div>;

  return (
    <div>
      <Input
        label={label}
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);

          const commander = possibleValues.find(
            (i: Record<string, string | string[]>) =>
              i.name === e.currentTarget.value,
          );

          if (commander) {
            updateFleet({
              commander: {
                name: commander.name,
                gender: commander.gender,
                birthYear: commander.birth_year,
                species: commander.species,
                homeworld: commander.homeworld,
              },
            });
          }
        }}
        list={dataListName}
        value={value || ''}
      />

      {data && data.results && (
        <datalist id={dataListName}>
          {data.results.map((character: Record<string, string>) => (
            <option value={character.name} key={character.name}>
              {character.name}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};
