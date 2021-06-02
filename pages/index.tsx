import React, { useEffect, useState } from 'react';
import Layout from '@components/Layout';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { getGridColumns, getGridWidth } from 'src/utils/gifs-grid-helpers';
import { RootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { Modal } from '@components/Modal';
import GifCard from '@components/GifCard';
import { auth, db } from 'src/firebase/base';
import { setUser } from '@redux/actions';
import { useAppDispatch } from '@redux/store';
import { useWindowSize } from 'src/Hooks/useWindowSize';
import { NextPage } from 'next';

const Home: NextPage<unknown> = () => {
  const { width } = useWindowSize();
  const contentWidth = width >= 768 ? 80 : 100;
  const dispatch = useAppDispatch();
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);
  const { searchTerm } = useSelector((state: RootState) => state.search);
  const { user } = useSelector((state: RootState) => state.auth);
  const trendingGifs = (offset: number) => gf.trending({ offset, limit: 30 });
  const searchingGifs = (offset: number) =>
    gf.search(searchTerm, { offset, limit: 30 });
  const [isModalOpen, toggleModal] = useState(false);
  const [showTrending, setShowingTrending] = useState(true);
  const [gif, selectGif] = useState({});

  useEffect(() => {
    setShowingTrending(!searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userFavs = await (
          await db.collection('users').doc(user.uid).get()
        ).data();
        if (!userFavs) {
          await db.collection('users').doc(user.uid).set({ favs: [] });
        }
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            userFavs: userFavs.favs,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  const onGifClick = (gif, e) => {
    selectGif(gif);
    toggleModal(true);
    e.preventDefault();
  };

  return (
    <Layout showSearchBar>
      <>
        <h1 style={{ color: 'white' }}>
          {showTrending ? '⚡ Trending' : 'Results'}
        </h1>
        {showTrending ? (
          <Grid
            width={getGridWidth(width, contentWidth)}
            columns={getGridColumns(width, contentWidth)}
            fetchGifs={trendingGifs}
            onGifClick={(gif, e) => {
              onGifClick(gif, e);
            }}
            noLink
          />
        ) : (
          <Grid
            key={searchTerm}
            width={getGridWidth(width, contentWidth)}
            columns={getGridColumns(width, contentWidth)}
            fetchGifs={searchingGifs}
            noResultsMessage={'Sorry, No Results!'}
            onGifClick={(gif, e) => {
              onGifClick(gif, e);
            }}
            noLink
          />
        )}
      </>

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

export default Home;
