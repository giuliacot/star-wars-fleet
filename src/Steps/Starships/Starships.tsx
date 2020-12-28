import React, { FunctionComponent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Starships as SwapiStarships } from '../../types/swapi';
import { useFleetContext } from '../fleetContext';

export const Starships: FunctionComponent = () => {
  const { fleet, updateStarships, removeStarships } = useFleetContext();
  const history = useHistory();
  const [errors, setErrors] = useState<string[][]>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fleet.starships && fleet.starships?.length > 0) {
      history.push('/generals');
    } else {
      setErrors([['starship', 'Your fleet has not starships. 🥺']]);
    }
  };
  return (
    <div>
      <h2>Now choose yours starships!</h2>
      <form onSubmit={onSubmit}>
        <SearchBar
          label="Compose your fleet with starships"
          kind="starships"
          name="starships"
          initialValue={''}
          matchingCheck={(v1: SwapiStarships, choosen: string) =>
            v1.name === choosen
          }
          set={(value: SwapiStarships) => {
            updateStarships([value]);
          }}
        ></SearchBar>
        {errors && errors.map((err) => <p>{`${err[1]}`}</p>)}
        {fleet.starships &&
          fleet.starships.map((s) => (
            <div key={s.name}>
              <Card name={s.name}>
                <p>Crew size: {s.crew}</p>
                <p>Model: {s.model}</p>
                <Button onClick={() => removeStarships(s)}>Remove</Button>
              </Card>
            </div>
          ))}
        <Button>
          <Link to={(location) => ({ ...location, pathname: '/details' })}>
            Back
          </Link>
        </Button>
        &nbsp;
        <Button>Next</Button>
      </form>
    </div>
  );
};
