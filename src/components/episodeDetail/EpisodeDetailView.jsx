import styles from './EpisodeDetailView.module.css';

export default function EpisodeDetailView({ episode }) {
  return (
    <div className={styles.episodeDetailContainer}>
      {episode.title && <p className={styles.title}>{episode.title}</p>}
      {episode.description && (
        <div dangerouslySetInnerHTML={{ __html: episode.description }} />
      )}
      {episode.audio && (
        <audio controls src={episode.audio} className={styles.audioPlayer} />
      )}
    </div>
  );
}
