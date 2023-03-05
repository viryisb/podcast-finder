import PodcastListContainer from './components/podcastList/PodcastListContainer';
import PodcastDetailContainer from './components/podcastDetail/podcastDetailContainer';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<PodcastListContainer />} />
          <Route path='/podcast/:id' element={<PodcastDetailContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
