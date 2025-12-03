import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string; // "YYYY-MM-DD HH:MM:SS"
}

type Props = { lang: 'en' | 'ko' };

const LogActivity: React.FC<Props> = ({ lang }) => {
  const texts = {
    en: {
      title: 'What Are You Doing Now?',
      placeholder: 'Write one line about your activity...',
      log: 'Log',
      activities: 'Activities',
      delete: 'Delete',
      empty: 'No activities logged yet.',
    },
    ko: {
      title: '지금 뭐하고 계세요?',
      placeholder: '지금 하고 있는 일을 한 줄로 작성하세요...',
      log: '기록',
      activities: '활동 기록',
      delete: '삭제',
      empty: '아직 기록된 활동이 없습니다.',
    },
  };

  const t = texts[lang];
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);

  // 페이지 로딩 시 로컬스토리지에서 기록 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) setActivities(JSON.parse(stored));
  }, []);

  // 로컬스토리지 저장
  const saveToStorage = (newActivities: Activity[]) => {
    localStorage.setItem('activities', JSON.stringify(newActivities));
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

  return (
    <div className="container">
      <h1>{t.title}</h1>
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

      <h2>{t.activities}</h2>
      <ul>
        {activities.length === 0 ? (
          <li>{t.empty}</li>
        ) : (
          activities.map((act) => (
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

export default LogActivity;