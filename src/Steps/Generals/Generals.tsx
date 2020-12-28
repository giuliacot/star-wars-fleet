import React, { FunctionComponent, SetStateAction, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { StarshipsEnrich, useFleetContext } from '../fleetContext';
import { People as SwapiPeople } from '../../types/swapi';
import { Button } from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

import { Error } from '../../components/Error/Error';

const GeneralItem: FunctionComponent<{
  starship: StarshipsEnrich;
  checkGeneral: (generalName: string) => boolean;
  errors: string[][];
  setErrors: React.Dispatch<React.SetStateAction<string[][]>>;
}> = ({ starship, checkGeneral, setErrors, errors }) => {
  const { addGeneral } = useFleetContext();

  return (
    <div key={starship.name + 'item'}>
      <p>{starship.name}</p>
      <SearchBar<SwapiPeople>
        label={'Search your General'}
        kind="people"
        name="general"
        initialValue={starship.general || ''}
        matchingCheck={(v1: SwapiPeople, choosen: string) =>
          v1.name === choosen
        }
        set={(value: SwapiPeople) => {
          if (checkGeneral(value.name)) {
            // TODO add info of which ship is matched already
            setErrors([[starship.name, 'This general is already taken 🥺']]);
          } else {
            addGeneral({ ...starship, general: value.name });
            setErrors(
              errors?.filter((e) => e[0] !== starship.name || 'generals'),
            );
          }
        }}
      />{' '}
      {errors &&
        errors.map((err) => {
          if (err[0] === starship.name) {
            return <Error>{`${err[1]}`}</Error>;
          }
        })}
    </div>
  );
};

export const Generals: FunctionComponent = () => {
  const { fleet } = useFleetContext();
  const [errors, setErrors] = useState<string[][]>([]); //Tuple of errors
  const [fakeLoading, setFakeLoading] = useState(false);
  const history = useHistory();

  const checkGeneralAlreadyPresent = (generalName: string) => {
    if (
      fleet.starships &&
      fleet.starships.filter((i) => i.general === generalName).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger;
    if (fleet.starships?.find((s) => s.general === undefined)) {
      setErrors([
        [
          'generals',
          "It's seems your are not choose a general for every starship 🥺",
        ],
      ]);
    } else {
      setFakeLoading(true);
      setTimeout(() => {
        history.push('/congrats');
        setFakeLoading(false);
      }, 1000);
    }
  };

  if (fakeLoading)
    return (
      <h1>We are submitting your fleet to the Star Wars headquarters...</h1>
    );
  return (
    <form onSubmit={onSubmit}>
      <h3>Choose a general for each starships!</h3>
      {fleet.starships?.map((s) => (
        <GeneralItem
          key={s.name}
          starship={s}
          checkGeneral={checkGeneralAlreadyPresent}
          errors={errors}
          setErrors={setErrors}
        />
      ))}
      {errors &&
        errors.map((e) => {
          if (e[0] === 'generals') {
            return <Error>{e[1]}</Error>;
          }
        })}
      <Button
        onClick={() => {
          history.push('/starships');
        }}
      >
        Back
      </Button>
      &nbsp;
      <Button>Submit your fleet</Button>
    </form>
  );
};
