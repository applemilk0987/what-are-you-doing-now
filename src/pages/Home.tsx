import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string; // YYYY-MM-DD HH:MM:SS
}

type Language = 'en' | 'ko';

const texts = {
  en: {
    title: 'What Are You Doing Now?',
    placeholder: 'Write one line about your activity...',
    log: 'Log',
    activities: 'Activities',
    delete: 'Delete',
    empty: 'No activities logged yet.',
    language: 'Language:',
    dateFilter: 'Filter by date:',
  },
  ko: {
    title: '지금 뭐하고 계세요?',
    placeholder: '지금 하고 있는 일을 한 줄로 작성하세요...',
    log: '기록',
    activities: '활동 기록',
    delete: '삭제',
    empty: '아직 기록된 활동이 없습니다.',
    language: '언어:',
    dateFilter: '날짜 선택:',
  },
};

const ActivityLogger: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('language') as Language;
    return stored || 'en';
  });
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) setActivities(JSON.parse(stored));
  }, []);

  const saveToStorage = (newActivities: Activity[]) => {
    localStorage.setItem('activities', JSON.stringify(newActivities));
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Language;
    setLang(selected);
    localStorage.setItem('language', selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = activity.trim();
    if (!trimmed) return;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toLocaleTimeString();

    const newActivity: Activity = {
      id: Date.now(),
      text: trimmed,
      timestamp: `${dateStr} ${timeStr}`,
    };

    const newActivities = [newActivity, ...activities];
    setActivities(newActivities);
    saveToStorage(newActivities);
    setActivity('');
  };

  const handleDelete = (id: number) => {
    const filtered = activities.filter((act) => act.id !== id);
    setActivities(filtered);
    saveToStorage(filtered);
  };

  const t = texts[lang];

  // 날짜 필터 적용
  const filteredActivities = filterDate
    ? activities.filter((act) => act.timestamp.startsWith(filterDate))
    : activities;

  return (
    <div className="container">
      {/* 언어 선택 */}
      <div style={{ marginBottom: '16px' }}>
        <label>
          {t.language}
          <select value={lang} onChange={handleLangChange} style={{ marginLeft: '8px' }}>
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </label>
      </div>

      {/* 제목 */}
      <h1>{t.title}</h1>

      {/* 기록 입력 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder={t.placeholder}
          maxLength={100}
        />
        <button type="submit">{t.log}</button>
      </form>

      {/* 날짜 필터 */}
      <div className="date-filter">
        <label>
          {t.dateFilter}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
      </div>

      {/* 기록 리스트 */}
      <h2>{t.activities}</h2>
      <ul>
        {filteredActivities.length === 0 ? (
          <li>{t.empty}</li>
        ) : (
          filteredActivities.map((act) => (
            <li key={act.id}>
              [{act.timestamp}] {act.text}
              <button onClick={() => handleDelete(act.id)}>{t.delete}</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ActivityLogger;