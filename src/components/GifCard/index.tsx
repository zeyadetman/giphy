import { Gif } from '@giphy/react-components';
import { setUser } from '@redux/actions';
import { useAppDispatch } from '@redux/store';
import React from 'react';
import { db } from 'src/firebase/base';
import styles from './index.module.scss';

interface GifCardInterface {
  user: any;
  gif: any;
}
const GifCard: React.FC<GifCardInterface> = ({ gif, user }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.gifCard}>
      <div>
        <Gif gif={gif} width={300} />
        <h1>
          {gif.title}{' '}
          {user && (
            <button
              onClick={async () => {
                if (user.userFavs.includes(gif.id)) {
                  const updatedFavs = user.userFavs.filter(
                    (gifId) => gifId !== gif.id,
                  );
                  await db
                    .collection('users')
                    .doc(user.uid)
                    .set({ favs: updatedFavs });
                  dispatch(setUser({ ...user, userFavs: updatedFavs }));
                } else {
                  const updatedFavs = [...user.userFavs, gif.id];
                  await db
                    .collection('users')
                    .doc(user.uid)
                    .set({ favs: updatedFavs });
                  dispatch(setUser({ ...user, userFavs: updatedFavs }));
                }
              }}
              className={styles.favIcon}
              style={{
                ...(user.userFavs.includes(gif.id)
                  ? { color: 'gold' }
                  : { color: 'gray' }),
              }}
            >
              &#x2605;
            </button>
          )}
        </h1>
      </div>
      {gif.user && (
        <div className={styles.userInfo}>
          <img src={gif.user.avatar_url} alt="user-avatar" />
          <p className={styles.displayName}>{gif.user.display_name}</p>
          <p className={styles.userName}>
            @{gif.user.username}{' '}
            {gif.user.is_verified && (
              <span className={styles.verifiedBadge}></span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default GifCard;
