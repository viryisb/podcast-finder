import React from 'react';

import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.navLink} to='/'>
          <div className={styles.logo}>
            <img src='../images/logo.png' alt='' width='70' />
            <span className={styles.logoText}>Podcaster</span>
          </div>
        </Link>
      </nav>
    </header>
  );
}
