import { LoadingContext } from '../context/LoadingContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Spinner from '../spinner/Spinner';

export default function Header() {
  const { isLoading } = useContext(LoadingContext);
  const { isSpinnerLoading } = useContext(LoadingContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.navLink} to='/'>
          <div className={styles.logo}>
            <img src='../images/logo.png' alt='' width='70' />
            <span className={styles.logoText}>Podcaster</span>
          </div>
        </Link>
        {isLoading && <Spinner />}
      </nav>
    </header>
  );
}
