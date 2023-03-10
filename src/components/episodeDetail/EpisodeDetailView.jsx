import PodcastDetailBar from '../podcastDetailBar/PodcastDetailBar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EpisodeDetailView.module.css';

export default function EpisodeDetailView({ episode }) {
  return (
    <div>
      {episode.title && <p>{episode.title}</p>}
      {episode.description && (
        <div dangerouslySetInnerHTML={{ __html: episode.description }} />
      )}
      {episode.audio && <audio controls src={episode.audio} />}
    </div>
  );
}
