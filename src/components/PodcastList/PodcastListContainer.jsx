import PodcastListView from './PodcastListView';
import React, { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';

const API_URL =
  'https://api.allorigins.win/get?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export default function PodcastListContainer() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);

    const storedData = localStorage.getItem('podcasts');
    const expirationDate = localStorage.getItem('podcasts_expiration');
    if (storedData && expirationDate && new Date(expirationDate) > new Date()) {
      setPodcasts(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          const parsedData = JSON.parse(data.contents).feed.entry;
          setPodcasts(parsedData);

          const storedData = {
            timestamp: new Date().getTime(),
            data: parsedData,
          };
          localStorage.setItem('podcasts', JSON.stringify(storedData));
          localStorage.setItem(
            'podcasts_expiration',
            new Date(Date.now() + 86400000).toString()
          );
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };
      fetchData();
    }
    setIsLoading(false);
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
