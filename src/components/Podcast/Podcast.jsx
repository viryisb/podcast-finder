import styles from './Podcast.module.css';
import { Link } from 'react-router-dom';

export default function Podcast({ podcast }) {
  return (
    <div className={styles.card} key={podcast.id.attributes['im:id']}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={podcast['im:image'][0].label}
          alt={podcast.title.label}
        />
      </div>

      {/* <Link to={`/podcast/${podcast.id}`}> */}
      <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>
        <h2 className={styles.title}>{podcast.title.label.toUpperCase()}</h2>
      </Link>

      <p className={styles.author}>Author: {podcast['im:artist'].label}</p>
    </div>
  );
}
