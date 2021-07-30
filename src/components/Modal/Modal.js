import { useEffect, useRef } from 'react';

import styles from './Modal.module.css';

export default function Modal({ url, tags, onClose }) {
  const windowListener = useRef(null);

  useEffect(() => {
    windowListener.current = window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      windowListener.current = window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={url} alt={tags} />
      </div>
    </div>
  );
}
