import React from 'react';
import styles from './index.module.scss';

export const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <h1>superplate</h1>
      <p>The frontend boilerplate with superpowers!</p>
    </div>
  );
};
