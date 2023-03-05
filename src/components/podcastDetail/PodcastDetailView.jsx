import React from 'react';

export default function PodcastDetailView({
  podcastData,
  podcastDescription,
  episodes,
}) {
  return (
    <>
      {podcastData ? (
        <>
          <h1>{podcastData.title}</h1>
          <p>Author: {podcastData.author}</p>
          {podcastDescription && (
            <div dangerouslySetInnerHTML={{ __html: podcastDescription }} />
          )}

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
    </>
  );
}
