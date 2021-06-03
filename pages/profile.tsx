import Layout from '@components/Layout';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import 'firebase/auth';
import { useAppDispatch } from '@redux/store';
import { setUser } from '@redux/actions';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { getGridColumns, getGridWidth } from 'src/utils/gifs-grid-helpers';
import { useWindowSize } from 'src/Hooks/useWindowSize';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { Modal } from '@components/Modal';
import GifCard from '@components/GifCard';
import { NextPage } from 'next';
import { auth, db } from 'src/firebase/base';
import { useRouter } from 'next/router';

const Profile: NextPage<unknown> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user }: any = useSelector((state: RootState) => state.auth);
  const fetchFavsGifs = () => gf.gifs(user.userFavs);
  const { width } = useWindowSize();
  const contentWidth = width >= 768 ? 80 : 100;
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);
  const [gif, selectGif] = useState({});
  const [isModalOpen, toggleModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
        router.push('/');
        dispatch(setUser(null));
      }
      setLoading(false);
    });
  }, []);

  const onGifClick = (gif, e) => {
    selectGif(gif);
    toggleModal(true);
    e.preventDefault();
  };

  return loading || !user ? (
    <></>
  ) : (
    <Layout>
      <h1 style={{ color: 'white' }}>⭐ Favourites</h1>
      {user?.userFavs ? (
        <Grid
          width={getGridWidth(width, contentWidth)}
          columns={getGridColumns(width, contentWidth)}
          fetchGifs={fetchFavsGifs}
          onGifClick={(gif, e) => {
            onGifClick(gif, e);
          }}
          noLink
        />
      ) : null}
      {gif && (
        <Modal
          isOpen={isModalOpen}
          toggleModal={() => {
            toggleModal(!isModalOpen);
          }}
          gif={gif}
        >
          <GifCard gif={gif} user={user} />
        </Modal>
      )}
    </Layout>
  );
};

export default Profile;
