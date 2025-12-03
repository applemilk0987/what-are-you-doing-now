import React from 'react';
import type { Language } from './Home';
import Home from './Home';

type HomeWrapperProps = {
  lang: Language;
  onLangChange: (lang: Language) => void;
};

const HomeWrapper: React.FC<HomeWrapperProps> = ({ lang, onLangChange }) => {
  return <Home lang={lang} onLangChange={onLangChange} />;
};

export default HomeWrapper;