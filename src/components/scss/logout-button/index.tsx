import React from 'react';
import styles from './index.module.scss';
const LogoutButton: React.FC = ({ userAvatarUrl, onClick }) => {
  return (
    <div className={styles.navigation} onClick={onClick}>
      <a className={styles.button} href="">
        <img src={userAvatarUrl} alt="user avatar" />
        <div className={styles.logout}>LOGOUT</div>
      </a>
    </div>
  );
};

export { LogoutButton };
