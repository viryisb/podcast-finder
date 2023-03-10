import { useState } from 'react';
import styles from './PlaylistTable.module.css';
import { Link, useParams } from 'react-router-dom';

export default function PlaylistTable({ podcastData, episodes, handleClick }) {
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
            <tr key={episode.id}>
              <td>
                <button
                  type='button'
                  className={styles.episodeLink}
                  onClick={() => handleClick(episode.id)}
                >
                  {episode.title}
                </button>
              </td>
              <td>{episode.date}</td>
              <td>{episode.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
{
  /* <Link to={`/podcast/episode/${id}`}>{episode.title}</Link> */
}
