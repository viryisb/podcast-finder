import React from 'react';
import styles from './PlaylistTable.module.css';

export default function Playlist({ podcastData, episodes }) {
  return (
    <div className={styles.podcastEpisodes}>
      <table className={styles.episodesTable}>
        <caption className={styles.episodeCount}>
          Episodes: {podcastData.episodeCount}
        </caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode) => (
            <tr key={episode.title}>
              <td>{episode.title}</td>
              <td>{episode.date}</td>
              <td>{episode.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
