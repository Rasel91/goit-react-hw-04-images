import { useState, useEffect } from 'react';
import Api from 'components/services/Api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import css from './App.module.css';

const api = new Api();

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loadBtnIsShown, setLoadBtnIsShown] = useState(false);
  const [status, setStatus] = useState(STATUS.idle);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(STATUS.pending);
    setLoadBtnIsShown(false);

    searchImages();

    const getRemainingPages = totalImages => {
      return Math.ceil(totalImages / api.perPage) - page;
    };

    async function searchImages() {
      try {
        const fetchImages = await api.fetchImages(query, page);
        if (fetchImages.totalHits === 0) {
          throw new Error('No images for your request. Please, try again.');
        }

        const remainingPages = getRemainingPages(fetchImages.totalHits);
        if (remainingPages > 0) {
          setLoadBtnIsShown(true);
        }

        //setImages([...images, ...fetchImages.hits]);
        setImages(prevImages => [...prevImages, ...fetchImages.hits]);
        setStatus(STATUS.resolved);
      } catch (error) {
        setError(error);
        setStatus(STATUS.rejected);
      }
    }
  }, [query, page]);

  const onFormSubmit = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
  };

  const onLoadBtnClick = event => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar
        onSubmit={onFormSubmit}
        isSubmitting={status === STATUS.pending}
      />

      {status === 'idle' && (
        <p className={css.text}>Please, enter your request</p>
      )}

      {(status === 'pending' || status === 'resolved') && (
        <ImageGallery images={images} />
      )}

      {status === 'pending' && <Loader />}

      {loadBtnIsShown && <Button onClick={onLoadBtnClick}>Load More</Button>}

      {status === 'rejected' && <p className={css.text}>{error.message}</p>}
    </div>
  );
}
