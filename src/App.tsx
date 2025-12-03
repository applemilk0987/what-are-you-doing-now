import { BrowserRouter, Route, Routes } from 'react-router-dom';
import History from './pages/History';
import Home from './pages/Home';
import LogActivity from './pages/LogActivity';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogActivity />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;