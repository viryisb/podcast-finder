import PodcastListContainer from './components/PodcastList/PodcastListContainer';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PodcastListContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
