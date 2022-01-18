import './App.css';
import StoriesList from './features/stories/StoriesList';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App" data-testid="app">
      <TopBar />
      <StoriesList />
    </div>
  );
}

export default App;
