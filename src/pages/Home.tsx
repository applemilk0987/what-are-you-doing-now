import React from 'react';
import ActivityLogger from './ActivityLogger.tsx';

export type Language = 'en' | 'ko';

type HomeProps = {
  lang: Language;
  onLangChange: (lang: Language) => void;
};

const Home: React.FC<HomeProps> = ({ lang, onLangChange }) => {
  return (
    <div className="container">
      {/* 언어 선택 */}
      <div style={{ marginBottom: '16px' }}>
        <label>
          {lang === 'en' ? 'Language:' : '언어:'}
          <select value={lang} onChange={(e) => onLangChange(e.target.value as Language)}>
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </label>
      </div>

      {/* ActivityLogger 바로 포함 */}
      <ActivityLogger lang={lang} />
    </div>
  );
};

export default Home;