import styles from './PodcastDetailView.module.css';
import PodcastDetailBar from '../podcastDetailBar/PodcastDetailBar';
import PlaylistTable from '../playlist/PlaylistTable';
import EpisodeDetailView from '../episodeDetail/EpisodeDetailView';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PodcastDetailView({
  podcastData,
  podcastDescription,
  episodes,
}) {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  const navigate = useNavigate();

  function handleClick(episodeId) {
    setSelectedEpisodeId(episodeId);
    navigate(`/podcast/episodes/${episodeId}`);
  }

  return (
    <>
      {podcastData && (
        <div className={styles.podcastDetailContainer}>
          <PodcastDetailBar
            podcastData={podcastData}
            podcastDescription={podcastDescription}
          />

          {selectedEpisodeId ? (
            <EpisodeDetailView
              episode={episodes.find(
                (episode) => episode.id === selectedEpisodeId
              )}
            />
          ) : (
            <PlaylistTable
              podcastData={podcastData}
              episodes={episodes}
              handleClick={handleClick}
            />
          )}
        </div>
      )}
    </>
  );
}
