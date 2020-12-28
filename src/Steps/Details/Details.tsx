import React, { useState } from 'react';
import style from './Details.module.css';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Error } from '../../components/Error/Error';

import { useFleetContext, FleetData } from '../fleetContext';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { People as SwapiPeople } from '../../types/swapi';
import { People } from './People/People';
import { useHistory } from 'react-router-dom';

export const Details: React.FunctionComponent = () => {
  const { fleet, updateFleet } = useFleetContext();

  const [nameFleet, setNameFleet] = useState<string>(fleet.name || '');
  const [descFleet, setdescFleet] = useState<string>(fleet.description || '');

  const [errors, setErrors] = useState<string[][]>(); //Tuple of errors with element and msg
  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fleet.name && fleet.description && fleet.commander) {
      history.push('/starships');
    } else {
      if (!fleet.commander) {
        setErrors([
          [
            'commander',
            'Are you sure of the commander choosed? It seems not a StarWars charcter at all! 🥺',
          ],
        ]);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Name"
        name="name"
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setNameFleet(e.currentTarget.value);
        }}
        required={true}
        value={nameFleet}
      />
      <Input
        label="Description"
        name="description"
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setdescFleet(e.currentTarget.value);
        }}
        value={descFleet}
        required={true}
      />
      <SearchBar<SwapiPeople>
        label={'Search your Commander'}
        kind="people"
        name="commander"
        initialValue={fleet?.commander?.name || ''}
        matchingCheck={(v1: SwapiPeople, choosen: string) =>
          v1.name === choosen
        }
        set={(value: SwapiPeople) => {
          updateFleet({
            commander: value,
          });
        }}
      />

      {fleet.commander && (
        //Todo: x icon on card do clear context
        <div>
          <p>Your commander:</p>
          <People people={fleet.commander} />
        </div>
      )}

      {errors && errors.map((err) => <Error key={err[1]}>{`${err[1]}`}</Error>)}

      <Button
        onClick={() => {
          updateFleet({
            name: nameFleet,
            description: descFleet,
          });
        }}
      >
        Next
      </Button>
    </form>
  );
};
