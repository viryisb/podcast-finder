import PodcastListContainer from './components/podcastList/PodcastListContainer';
import PodcastDetailContainer from './components/podcastDetail/podcastDetailContainer';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './components/context/LoadingContext';

function App() {
  return (
    <div>
      <LoadingProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path='/' element={<PodcastListContainer />} />
            <Route path='/podcast/:id' element={<PodcastDetailContainer />} />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </div>
  );
}

export default App;
