import React from 'react';
import { Input } from '../input';
import styles from './index.module.scss';
import { useAppDispatch } from '@redux/store';
import { setSearchTerm } from '@redux/actions';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.header} data-testid="container">
      <Input
        type="search"
        placeholder="Search..."
        onSubmit={(e) => {
          e.preventDefault();
          const { search } = Object.fromEntries(new FormData(e.target));
          dispatch(setSearchTerm(search));
        }}
      />
    </div>
  );
};
