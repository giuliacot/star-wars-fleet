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
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Fleet Details
      </NavLink>
      <NavLink
        className={style.step}
        to="/starships"
        activeClassName={style.currentStep}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Fleet Starships
      </NavLink>
      <NavLink
        className={style.step}
        to="/generals"
        activeClassName={style.currentStep}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Fleet Generals
      </NavLink>
    </ul>
  );
};
