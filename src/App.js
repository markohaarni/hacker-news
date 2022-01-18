import './App.css';
import { StoriesList } from './features/stories/StoriesList';

function App() {
  return (
    <div className="App" data-testid="app">
      <StoriesList />
    </div>
  );
}

export default App;
