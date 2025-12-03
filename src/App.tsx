import { useState } from 'react';
import type { Language } from './pages/Home';
import Home from './pages/Home';

function App() {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('language') as Language;
    return stored || 'en';
  });

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  return <Home lang={lang} onLangChange={handleLangChange} />;
}

export default App;