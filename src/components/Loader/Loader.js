import Loader from 'react-loader-spinner';

import styles from './Loader.module.css';

const LoaderComponent = () => (
  <div className={styles.loader}>
    <Loader
      type="Circles"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={3000}
    />
  </div>
);

export default LoaderComponent;
