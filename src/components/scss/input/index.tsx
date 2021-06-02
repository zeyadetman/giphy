import React from 'react';
import styles from './index.module.scss';

interface InputInterface {
  placeholder: string;
  onSubmit: (e: any) => void;
}
const Search: React.FC<InputInterface> = ({ onSubmit, placeholder }) => {
  return (
    <form onSubmit={onSubmit} role="search" className={styles.form}>
      <input
        name="search"
        id="search"
        type="search"
        placeholder={placeholder}
        autoFocus
      />
      <button type="submit">Search</button>
    </form>
  );
};

const mappingComponent: any = {
  search: (props) => <Search {...props} />,
};

interface InputInterface {
  type?: string;
  placeholder: string;
  onSubmit: (e: any) => void;
}
export const Input: React.FC<InputInterface> = ({ type, ...props }: any) => {
  return mappingComponent[type](props);
};
