import Podcast from '../podcast/Podcast';
import SearchBar from '../searchBar/SearchBar';

import styles from './PodcastListView.module.css';

export default function PodcastListView({ podcasts, onSearchInputChange }) {
  return (
    <div className={styles.container}>
      <SearchBar onSearchInputChange={onSearchInputChange} />
      <div className={styles.cards}>
        {podcasts.map((podcast) => (
          <Podcast key={podcast.id.attributes['im:id']} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
