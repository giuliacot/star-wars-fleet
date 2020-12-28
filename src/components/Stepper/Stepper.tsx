import React, { FunctionComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './Stepper.module.css';

export const Stepper: FunctionComponent = () => {
  return (
    <ul className={style.stepWrapper}>
      <NavLink
        className={style.step}
        to="/details"
        activeClassName={style.currentStep}
      >
        Fleet Details
      </NavLink>
      <NavLink
        className={style.step}
        to="/starships"
        activeClassName={style.currentStep}
      >
        Fleet Starships
      </NavLink>
      <NavLink
        className={style.step}
        to="/generals"
        activeClassName={style.currentStep}
      >
        Fleet Generals
      </NavLink>
    </ul>
  );
};
