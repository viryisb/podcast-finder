import styles from './PodcastDetailBar.module.css';

import { Link } from 'react-router-dom';

export default function PodcastDetailBar({
  podcastData,
  podcastDescription,
  onTitleClick,
  onImageClick,
}) {
  return (
    <div className={styles.podcastSidebar}>
      <Link to={`/podcast/${podcastData.id}`} onClick={onImageClick}>
        <img src={podcastData.image} alt={podcastData.title} />
      </Link>
      <Link to={`/podcast/${podcastData.id}`} onClick={onTitleClick}>
        <h2>{podcastData.title}</h2>
      </Link>
      <p> By: {podcastData.author}</p>
      {podcastDescription && (
        <>
          <p>Description:</p>
          <div dangerouslySetInnerHTML={{ __html: podcastDescription }} />
        </>
      )}
    </div>
  );
}
