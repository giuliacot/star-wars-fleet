import React, { FunctionComponent, Fragment } from 'react';
import style from './Input.module.css';

type Input = {
  label: string;
  type: 'text' | 'checkbox' | 'radio' | 'button' | 'date' | 'hidden';
  value?: string;
  list?: string;
  name?: string;
  required?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Input: FunctionComponent<Input> = (props) => {
  const random = getRndInteger(1, 400);
  const { label, type, value, list, name, required } = props;

  return (
    <Fragment>
      <div className={style.wrapper}>
        <label className={style.label} htmlFor={`label-${random}`}>
          {label}
        </label>
        <input
          onChange={props.onChange}
          className={style.input}
          id={`label-${random}`}
          type={type}
          value={value}
          list={list}
          onClick={props.onClick}
          name={name}
          required={required}
        />
      </div>
    </Fragment>
  );
};
