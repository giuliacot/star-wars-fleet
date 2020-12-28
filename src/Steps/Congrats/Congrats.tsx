import React, { FunctionComponent } from 'react';
import style from '../Congrats/Congrats.module.css';
import { useFleetContext } from '../fleetContext';

export const Congrats: FunctionComponent = () => {
  const { fleet } = useFleetContext();
  return (
    <div>
      <h1 className={style.msg}>
        You have successfully submit the best Star wars fleet ever
      </h1>
      <h2>Recap:</h2>
      <ul>
        <li>Name: {fleet.name}</li>
        <li>Description: {fleet.description}</li>
        <li>Commander: {fleet.commander?.name}</li>
      </ul>
      <h3>Starships</h3>
      <ul>
        {fleet.starships?.map((s) => (
          <li key={s.name}>
            {s.name} - General: {s.general}
          </li>
        ))}
      </ul>
    </div>
  );
};
