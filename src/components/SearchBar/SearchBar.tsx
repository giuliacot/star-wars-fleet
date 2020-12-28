import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useFleetContext } from '../../Steps/fleetContext';

import { Input } from '../Input/Input';
import { useDataQuery } from './useDataQuery';

type Props<T> = {
  label: string;
  kind: 'people' | 'starships';
  name: string;
  set: (value: T) => void;
  matchingCheck: (v1: T, choosen: string) => boolean;
  initialValue: string;
} & React.HTMLAttributes<HTMLInputElement | HTMLDataListElement>;

export function SearchBar<T>({
  label,
  kind,
  name,
  set,
  matchingCheck,
  initialValue,
}: Props<T>) {
  const { fleet } = useFleetContext();
  const dataListName = label.trim().toLowerCase();
  const [value, setValue] = useState<string>(initialValue);
  const [possibleValues, setPossibleValues] = useState<T[]>([]);

  const { isLoading, error, data, refetch } = useDataQuery({
    kind,
    value,
    dataListName,
  });

  // Refetching base on the new input value
  useEffect(() => {
    refetch();
  }, [value]);

  // Set datalist options to validate input
  useEffect(() => {
    if (data?.results) {
      setPossibleValues(data.results);
    }
  }, [data]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);

    const isPossibileValue = possibleValues.find((i) =>
      matchingCheck(i, e.currentTarget.value),
    );

    if (isPossibileValue) {
      set(isPossibileValue);
    }
  };

  if (error) throw error;

  if (isLoading) <div>Loading</div>;

  return (
    <div>
      <Input
        label={label}
        type="text"
        name={name}
        onChange={onChange}
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
}
