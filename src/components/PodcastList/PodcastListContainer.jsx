import PodcastListView from './PodcastListView';
import React, { useState, useEffect } from 'react';

export default function PodcastListContainer() {
  const API_URL =
    'https://api.allorigins.win/get?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        console.log(data);
        setPodcasts(JSON.parse(data.contents).feed.entry);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <PodcastListView podcasts={podcasts} />;
}
