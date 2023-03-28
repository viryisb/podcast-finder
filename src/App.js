import PodcastListContainer from './components/podcastList/PodcastListContainer';
import PodcastDetailContainer from './components/podcastDetail/podcastDetailContainer';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import EpisodeDetailContainer from './components/episodeDetail/EpisodeDetailContainer';

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
              path='/podcast/:podcastId/:episodeId'
              element={<EpisodeDetailContainer />}
            />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </div>
  );
}

export default App;
