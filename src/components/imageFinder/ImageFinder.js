import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

export default function ImageFinder() {
  const [images, setImages] = useState('');

  const formSubmitHandle = data => {
    setImages(data);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandle} />
      <ToastContainer />
      <ImageGallery images={images} />
    </>
  );
}
