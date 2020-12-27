import React, { FunctionComponent, ReactNode } from 'react';
import style from './Button.module.css';

export const Button: FunctionComponent<
  React.HTMLAttributes<HTMLButtonElement> & ReactNode
> = ({ children, onClick }) => {
  return (
    <button className={style.button} type="submit" onClick={onClick}>
      {children}
    </button>
  );
};
