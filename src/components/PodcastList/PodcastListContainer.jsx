import PodcastListView from './PodcastListView';
import React, { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';

const API_URL =
  'https://api.allorigins.win/get?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export default function PodcastListContainer() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setIsLoading } = useContext(LoadingContext);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();

      const podcastEntries = JSON.parse(data.contents).feed.entry;
      const podcastsWithTimestamp = podcastEntries.map((entry) => {
        const storedData = localStorage.getItem(
          `podcast_${entry.id.attributes['im:id']}`
        );
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const now = new Date().getTime();
          if (now - parsedData.timestamp < 86400000) {
            return { ...entry, storedData: parsedData };
          }
        }
        return entry;
      });

      setPodcasts(podcastsWithTimestamp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPodcasts = podcasts.filter((podcast) => {
    const title = podcast['im:name'].label.toLowerCase();
    const author = podcast['im:artist'].label.toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search) || author.includes(search);
  });

  return (
    <PodcastListView
      podcasts={filteredPodcasts}
      onSearchInputChange={handleSearchInputChange}
    />
  );
}
