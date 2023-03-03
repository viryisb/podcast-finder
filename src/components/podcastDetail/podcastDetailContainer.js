import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PodcastDetailContainer() {
  const { id } = useParams();
  const [podcastData, setPodcastData] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const API_URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`; //proxi not working, to fix

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const text = await response.text();
        const json = JSON.parse(text);
        const data = json.results;

        if (data.length > 0) {
          setPodcastData({
            title: data[0].collectionName,
            author: data[0].artistName,
            image: data[0].artworkUrl600,
            episodeCount: data[0].trackCount,
          });
          const formatDate = (dateString) => {
            const options = {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            };
            const date = new Date(dateString);
            return date.toLocaleDateString(undefined, options);
          };
          const formatDuration = (durationMillis) => {
            const durationInSeconds = Math.floor(durationMillis / 1000);
            const hours = Math.floor(durationInSeconds / 3600)
              .toString()
              .padStart(2, '0');
            const minutes = Math.floor((durationInSeconds % 3600) / 60)
              .toString()
              .padStart(2, '0');
            const seconds = Math.floor(durationInSeconds % 60)
              .toString()
              .padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
          };
          const episodeData = data.slice(1).map((episode) => ({
            title: episode.trackName,
            date: formatDate(episode.releaseDate),
            duration: formatDuration(episode.trackTimeMillis),
          }));
          setEpisodes(episodeData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
      {podcastData ? (
        <>
          <h1>{podcastData.title}</h1>
          <p>Author: {podcastData.author}</p>
          <img src={podcastData.image} alt={podcastData.title} />
          <p>Episodes: {podcastData.episodeCount}</p>
          <ul>
            {episodes.map((episode) => (
              <li key={episode.title}>
                <p>{episode.title}</p>
                <p>{episode.date}</p>
                <p>duration: {episode.duration}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

/* const API_URL =
  'https://api.allorigins.win/get?url=https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20'; */
