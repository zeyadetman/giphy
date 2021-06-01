import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <a href="https://twitter.com/zeyadetman" target="_blank">
        <Image
          src="/icons/twitter-icon.svg"
          alt="twitter"
          width="20"
          height="20"
        />
      </a>
    </div>
  );
};
