import Podcast from '../Podcast/Podcast';
import SearchBar from '../searchBar/SearchBar';

export default function PodcastListView({ podcasts }) {
  return (
    <>
      <SearchBar />
      {podcasts.map((podcast) => (
        <Podcast key={podcast.id.attributes['im:id']} podcast={podcast} />
      ))}
    </>
  );
}
