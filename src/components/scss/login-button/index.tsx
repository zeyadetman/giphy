import React from 'react';
import styles from './index.module.scss';

interface LoginButtonInterface {
  onClick: () => void;
}
const LoginButton: React.FC<LoginButtonInterface> = ({ onClick }) => {
  return (
    <a
      onClick={onClick}
      className={styles.loginButton}
      target="_blank"
      rel="nofollow"
    >
      <span>Login</span>
    </a>
  );
};

export { LoginButton };
