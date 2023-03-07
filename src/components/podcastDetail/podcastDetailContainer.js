import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, formatDuration } from '../../utils';
import PodcastDetailView from './PodcastDetailView';

export default function PodcastDetailContainer() {
  const { id } = useParams();
  const [podcastData, setPodcastData] = useState(null);
  const [podcastDescription, setPodcastDescription] = useState('');
  const [episodes, setEpisodes] = useState([]);

  const API_URL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

  useEffect(() => {
    async function fetchData() {
      try {
        const storedData = localStorage.getItem(`podcast_${id}`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const now = new Date().getTime();
          if (now - parsedData.timestamp < 86400000) {
            setPodcastData(parsedData.data);
            setEpisodes(parsedData.episodes);
            return;
          }
        }

        const response = await fetch(API_URL);
        const text = await response.text();
        const json = JSON.parse(text);
        const data = json.results;

        if (data.length > 0) {
          const podcastData = {
            title: data[0].collectionName,
            author: data[0].artistName,
            image: data[0].artworkUrl600,
            episodeCount: data[0].trackCount,
            description: data[0].feedUrl,
          };

          const episodeData = data.slice(1).map((episode) => ({
            title: episode.trackName,
            date: formatDate(episode.releaseDate),
            duration: formatDuration(episode.trackTimeMillis),
          }));

          setPodcastData(podcastData);
          setEpisodes(episodeData);

          const storedData = {
            timestamp: new Date().getTime(),
            data: podcastData,
            episodes: episodeData,
          };
          localStorage.setItem(`podcast_${id}`, JSON.stringify(storedData));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchDescription() {
      try {
        const response = await fetch(podcastData.description);
        const text = await response.text();
        const dom = new window.DOMParser().parseFromString(text, 'text/xml');
        const description = dom.querySelector('description').textContent;
        setPodcastDescription(description);
      } catch (error) {
        console.error(error);
      }
    }

    if (podcastData) {
      fetchDescription();
    }
  }, [podcastData]);

  return (
    <div>
      <PodcastDetailView
        podcastData={podcastData}
        podcastDescription={podcastDescription}
        episodes={episodes}
      />
    </div>
  );
}
