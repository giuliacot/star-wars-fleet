import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import style from './Stepper.module.css';

export const Stepper: FunctionComponent = () => {
  return (
    <ul>
      <li>
        <Link className={style.link} to="/details">
          Fleet Details
        </Link>
      </li>
      <li>
        <Link className={style.link} to="/starships">
          Fleet Starships
        </Link>
      </li>
      <li>
        <Link className={style.link} to="/generals">
          Fleet Generals
        </Link>
      </li>
    </ul>
  );
};
