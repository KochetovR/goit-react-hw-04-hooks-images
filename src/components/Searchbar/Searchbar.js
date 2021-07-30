import { useState } from 'react';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [images, setImages] = useState('');

  const handleInputChange = e => {
    const value = e.currentTarget.value.toLowerCase();

    setImages(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (images.trim() === '') {
      toast.error('Enter a valid search');
      return;
    }

    onSubmit(images);

    reset();
  };

  const reset = () => {
    setImages('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__button__label}>Search</span>
        </button>

        <input
          value={images}
          onChange={handleInputChange}
          className={styles.SearchForm__input}
          type="text"
          // autocomplete="off"
          // autofocus="true"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
