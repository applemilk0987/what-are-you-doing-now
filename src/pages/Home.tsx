import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  lang: 'en' | 'ko';
  onLangChange: (lang: 'en' | 'ko') => void;
};

const Home: React.FC<Props> = ({ lang, onLangChange }) => {
  return (
    <div className="home-container">
      <h1>{lang === 'en' ? 'Welcome to "What Are You Doing Now?"' : '지금 뭐하고 계세요?'}</h1>
      <p>{lang === 'en' ? 'Start logging your activities!' : '지금 하고 있는 활동을 기록해보세요!'}</p>

      <div style={{ marginBottom: '16px' }}>
        <label>
          {lang === 'en' ? 'Language:' : '언어:'}
          <select
            value={lang}
            onChange={(e) => onLangChange(e.target.value as 'en' | 'ko')}
            style={{ marginLeft: '8px' }}
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </label>
      </div>

      <div className="home-buttons">
        <Link to="/log" className="btn">{lang === 'en' ? 'Log Activity' : '기록하기'}</Link>
        <Link to="/history" className="btn">{lang === 'en' ? 'View History' : '기록 보기'}</Link>
      </div>
    </div>
  );
};

export default Home;