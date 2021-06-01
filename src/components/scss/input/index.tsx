import React from 'react';
import styles from './index.module.scss';

const Search: React.FC = ({ onSubmit, placeholder }) => {
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

export const Input: React.FC = ({ type, ...props }: any) => {
  return mappingComponent[type](props);
};
