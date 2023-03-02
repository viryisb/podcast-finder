import styles from './Podcast.module.css';

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
      <h2 className={styles.title}>{podcast.title.label.toUpperCase()}</h2>
      <p className={styles.author}>{podcast['im:artist'].label}</p>
    </div>
  );
}
