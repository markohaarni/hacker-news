import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoriesList from './features/stories/StoriesList';
import TopBar from './components/TopBar';
import SingleStoryPage from './features/stories/SingleStoryPage';

function App() {
  return (
    <div className="App" data-testid="app">
      <TopBar />
      <Router>
        <Routes>
          <Route path="/" element={<StoriesList />} />
          <Route path=":storyId" element={<SingleStoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
