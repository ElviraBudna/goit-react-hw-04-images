import { Loader } from 'components/Loader/Loader';
import axios from 'axios';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import ButtonLoadMore from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '34502026-b3b6775c6b884fa93647474e5';
const OPTION_FOR_RESPONSE = 'image_type=photo&orientation=horizontal';
const PER_PAGE = 12;

export function App() {
  const [searchName, setSearchName] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    setLoading(true);
    setLoadMore(false);
    setError(false);

    async function fetchApi() {
      try {
        const response = await axios.get(
          `${BASE_URL}?key=${MY_KEY}&q=${searchName}&${OPTION_FOR_RESPONSE}&page=${page}&per_page=${PER_PAGE}`
        );

        let hits = response.data.hits;

        if (hits) {
          hits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
            id,
            largeImageURL,
            webformatURL,
            tags,
          }));

          if (hits.length === 0) {
            setLoadMore(false);
            setError(true);
          }
        }

        const totalHits = response.data.totalHits;

        if (totalHits > page * PER_PAGE) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }

        return hits;
      } catch (error) {
        setPhotos([]);
        setLoadMore(false);
        setError(true);
        setPage(1);
      } finally {
        setLoading(false);
      }
    }

    fetchApi().then(photo => {
      setPhotos(prevState => [...prevState, ...photo]);
    });
  }, [searchName, page]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const formSubmitHandler = data => {
    setSearchName(() => data);
    setPhotos([]);
    setPage(1);
  };

  const onClickImg = item => {
    setLargeImageURL(() => item);
    toggleModal();
  };

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={formSubmitHandler} />
      {loading && <Loader />}
      {error && <ErrorMessage name={searchName} />}
      {photos.length > 0 && (
        <ImageGallery photos={photos} onClick={onClickImg} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      {loadMore && <ButtonLoadMore onClick={onClickLoadMore} />}
    </AppContainer>
  );
}
