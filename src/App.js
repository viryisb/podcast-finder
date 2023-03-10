import PodcastListContainer from './components/podcastList/PodcastListContainer';
import PodcastDetailContainer from './components/podcastDetail/podcastDetailContainer';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import EpisodeDetailView from './components/episodeDetail/EpisodeDetailView';

function App() {
  return (
    <div>
      <LoadingProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path='/' element={<PodcastListContainer />} />
            <Route path='/podcast/:id' element={<PodcastDetailContainer />} />
            <Route
              path='/podcast/episodes/:episodeId'
              element={<PodcastDetailContainer />}
            />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </div>
  );
}

export default App;
