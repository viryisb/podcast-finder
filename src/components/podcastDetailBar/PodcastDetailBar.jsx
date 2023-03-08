import styles from './PodcastDetailBar.module.css';

export default function PodcastDetailBar({ podcastData, podcastDescription }) {
  return (
    <div className={styles.podcastSidebar}>
      <img src={podcastData.image} alt={podcastData.title} />
      <h2>{podcastData.title}</h2>
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
