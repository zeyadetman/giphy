import React, { useEffect, useState } from 'react';
import { Input } from '../input';
import styles from './index.module.scss';
import { useAppDispatch } from '@redux/store';
import { setSearchTerm, setUser } from '@redux/actions';
import { auth, db, firebase } from 'src/firebase/base';
import { LogoutButton } from '../logout-button';
import { LoginButton } from '../login-button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
interface HeaderInterface {
  showSearchBar: boolean;
}
export const Header: React.FC<HeaderInterface> = ({ showSearchBar }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { favs } = await (
          await db.collection('users').doc(user.uid).get()
        ).data();
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            userFavs: favs,
          }),
        );
      } else {
        dispatch(setUser(null));
      }

      setLoading(false);
    });
  }, []);

  return loading ? (
    <></>
  ) : (
    <div className={styles.header} data-testid="container">
      {showSearchBar ? (
        <Input
          type="search"
          placeholder="Search..."
          onSubmit={(e) => {
            e.preventDefault();
            const { search } = Object.fromEntries(new FormData(e.target));
            dispatch(setSearchTerm(search));
          }}
        />
      ) : (
        <div></div>
      )}

      {user ? (
        <div className={styles.userNav}>
          {router.pathname === '/' ? (
            <Link href="/en/profile">
              <span className={styles.route}>/Profile</span>
            </Link>
          ) : (
            <Link href="/en">
              <span className={styles.route}>/Home</span>
            </Link>
          )}
          <LogoutButton onClick={signOut} userAvatarUrl={user.photoURL} />
        </div>
      ) : (
        <LoginButton onClick={signInWithGoogle}>Login</LoginButton>
      )}
    </div>
  );
};
