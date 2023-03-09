import styles from './PodcastDetailView.module.css';
import PodcastDetailBar from '../podcastDetailBar/PodcastDetailBar';
import PlaylistTable from '../playlist/PlaylistTable';

export default function PodcastDetailView({
  podcastData,
  podcastDescription,
  episodes,
}) {
  return (
    <>
      {podcastData && (
        <div className={styles.podcastDetailContainer}>
          <PodcastDetailBar
            podcastData={podcastData}
            podcastDescription={podcastDescription}
          />
          <PlaylistTable podcastData={podcastData} episodes={episodes} />
        </div>
      )}
    </>
  );
}
