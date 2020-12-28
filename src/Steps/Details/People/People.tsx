import React, { FunctionComponent } from 'react';
import { Card } from '../../../components/Card/Card';
import { usePeople } from '../../../hooks/usePeople';
import style from './People.module.css';
import { Homeworld } from '../Homeworld/Homeworld';
import { Species } from '../Species/Species';
import { useFleetContext } from '../../fleetContext';
import { People as SwapiPeople } from '../../../types/swapi';

export const People: FunctionComponent<{
  people: SwapiPeople;
}> = ({ people }) => {
  return (
    <div className={style.wrapperCard}>
      <Card name={people.name}>
        <p className={style.detail}>Gender: {people.gender || 'n/a'}</p>
        <p className={style.detail}>Birth Year: {people.birth_year || 'n/a'}</p>
        <Homeworld className={style.detail} url={people.homeworld} />
        {people.species.length > 0 &&
          people.species.map((url) => (
            <Species className={style.detail} key={url} url={url} />
          ))}
      </Card>
    </div>
  );
};
