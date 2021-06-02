import React from 'react';
import styles from './index.module.scss';

interface LogoutInterface {
  userAvatarUrl: string;
  onClick: (e: any) => Promise<void>;
}
const LogoutButton: React.FC<LogoutInterface> = ({
  userAvatarUrl,
  onClick,
}) => {
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
