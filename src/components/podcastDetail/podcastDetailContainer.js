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
            description: data[0].feedUrl,
          });

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
