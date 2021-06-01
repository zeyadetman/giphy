import React, { useEffect, useState } from 'react';
import Layout from '@components/Layout';
import { Gif, Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useWindowSize } from 'src/Hooks/useWindowSize';
import { getGridColumns, getGridWidth } from 'src/utils/gifs-grid-helpers';
import { RootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { Modal } from '@components/Modal';

const Home: React.FC = () => {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);
  const { searchTerm } = useSelector((state: RootState) => state.search);
  const trendingGifs = (offset: number) => gf.trending({ offset, limit: 50 });
  const searchingGifs = (offset: number) =>
    gf.search(searchTerm, { offset, limit: 50 });
  const { width } = useWindowSize();
  const contentWidth = width >= 768 ? 80 : 100;
  const [isModalOpen, toggleModal] = useState(false);
  const [showTrending, setShowingTrending] = useState(true);
  const [gif, selectGif] = useState({});

  useEffect(() => {
    setShowingTrending(!searchTerm);
  }, [searchTerm]);

  return (
    <Layout contentWidth={contentWidth}>
      <>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            toggleModal(true);
          }}
        >
          Sign Up
        </button>
        <h1 style={{ color: 'white' }}>
          {showTrending ? '⚡ Trending' : 'Results'}
        </h1>
        {showTrending ? (
          <Grid
            width={getGridWidth(width, contentWidth)}
            columns={getGridColumns(width, contentWidth)}
            fetchGifs={trendingGifs}
            onGifClick={(gif, e) => {
              selectGif(gif);
              e.preventDefault();
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
              selectGif(gif);
              e.preventDefault();
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
          <Gif gif={gif} width={300} />
        </Modal>
      )}
    </Layout>
  );
};

export default Home;
