import React from 'react';
import styles from './index.module.scss';

interface LoginButtonInterface {
  onClick: (e: any) => Promise<void>;
}
const LoginButton: React.FC<LoginButtonInterface> = ({ onClick }) => {
  return (
    <a onClick={onClick} className={styles.loginButton} href="">
      <span>Login</span>
    </a>
  );
};

export { LoginButton };
