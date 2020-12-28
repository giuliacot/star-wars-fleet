import React, { FunctionComponent, ReactNode } from 'react';
import style from './Error.module.css';

export const Error: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <h4 className={style.msg}>{children}</h4>;
};
