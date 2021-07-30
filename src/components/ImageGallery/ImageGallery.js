import { useState, useEffect } from 'react';
import imageFinderAPI from '../services/imageFinder-api';
import Modal from '../Modal/Modal';
import LoaderComponent from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

import styles from './ImageGallery.module.css';

const KEY = '21916161-6ae0745b5418f2e7bb34916ca';
const URL = 'https://pixabay.com/api/';
let page = 1;

export default function ImageGallery({ images }) {
  const [Newimages, setNewImages] = useState(null);
  const [urlImage, setUrlImage] = useState('');
  const [tagsImage, setTagsImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');

  console.log(Newimages);

  useEffect(() => {
    if (!images) {
      return;
    }
    setStatus('pending');
    console.log(images);
    imageFinderAPI(images)
      .then(images => {
        if (images.hits.length === 0) {
          return setStatus('rejected');
        }
        setNewImages(images.hits);
        setStatus('resolved');
      })
      .finally(() => scrollPage());
  }, [images]);

  const handleClickLoadMore = () => {
    page += 1;

    setStatus('pending');

    fetch(
      `${URL}?q=${images}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => res.json())
      .then(images => {
        setNewImages([...Newimages, ...images.hits]);
        setStatus('resolved');
      })
      .finally(() => scrollPage());
  };

  const handleClickItem = (largeImageURL, tags) => {
    setUrlImage(largeImageURL);
    setTagsImage(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (status === 'idle') {
    return <></>;
  }

  if (status === 'pending') {
    return <LoaderComponent />;
  }

  if (status === 'rejected') {
    return <h1 className={styles.warning}>Enter something else</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={styles.ImageGallery}>
          {Newimages && (
            <ImageGalleryItem images={Newimages} onClick={handleClickItem} />
          )}
        </ul>
        {Newimages && <Button onClick={handleClickLoadMore} />}

        {showModal && (
          <Modal onClose={closeModal} url={urlImage} tags={tagsImage} />
        )}
      </>
    );
  }
}
