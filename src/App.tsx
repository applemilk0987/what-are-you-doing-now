import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';

type Language = 'en' | 'ko';

function App() {
  const [lang, setLang] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language') as Language;
    return storedLang || 'en';
  });

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home lang={lang} onLangChange={handleLangChange} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;