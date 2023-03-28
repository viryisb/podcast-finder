import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, formatDuration } from '../../utils';
import { LoadingContext } from '../../context/LoadingContext';
import EpisodeDetailView from './EpisodeDetailView';
import PodcastDetailBar from '../podcastDetailBar/PodcastDetailBar';

export default function EpisodeDetailContainer() {
  const { podcastId, episodeId } = useParams();
  const [podcastData, setPodcastData] = useState(null);
  const [podcastDescription, setPodcastDescription] = useState('');
  const [episodeData, setEpisodeData] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  const API_URL = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const storedData = localStorage.getItem(`podcast_${podcastId}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const now = new Date().getTime();
        if (now - parsedData.timestamp < 86400000) {
          setPodcastData(parsedData.data);
          setEpisodeData(parsedData.episodes);
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(API_URL);
      const text = await response.text();
      const json = JSON.parse(text);
      const data = json.results;

      if (data.length > 0) {
        const podcastData = {
          id: data[0].collectionId,
          title: data[0].collectionName,
          author: data[0].artistName,
          image: data[0].artworkUrl600,
          episodeCount: data[0].trackCount,
          description: data[0].feedUrl,
        };

        const episodeData = data.slice(1).map((episode) => ({
          id: episode.trackId,
          description: episode.description,
          title: episode.trackName,
          date: formatDate(episode.releaseDate),
          duration: formatDuration(episode.trackTimeMillis),
        }));

        setPodcastData(podcastData);
        setEpisodeData(episodeData);

        const storedData = {
          timestamp: new Date().getTime(),
          data: podcastData,
          episodes: episodeData,
        };

        localStorage.setItem(
          `podcast_${podcastId}`,
          JSON.stringify(storedData)
        );
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log('fetchData');
  }, [API_URL]);

  useEffect(() => {
    const fetchDescription = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(podcastData.description);
        const text = await response.text();
        const dom = new window.DOMParser().parseFromString(text, 'text/xml');
        const description = dom.querySelector('description').textContent;
        setPodcastDescription(description);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    if (podcastData) {
      fetchDescription();
      console.log('fetchDescription');
    }
  }, [podcastData, setIsLoading]);

  if (!podcastData || !episodeData?.length) return null;

  console.log(podcastData);

  return (
    <>
      <PodcastDetailBar
        podcastData={podcastData}
        podcastDescription={podcastDescription}
        onTitleClick={() => null}
        onImageClick={() => null}
      />
      <EpisodeDetailView
        podcast={podcastData}
        episode={episodeData.find(
          (episode) => episode.id === Number(episodeId)
        )}
      />
    </>
  );
}
