import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string;
}

const LogActivity: React.FC = () => {
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);

  // 페이지 로딩 시 로컬스토리지에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
  }, []);

  // 로컬스토리지 저장
  const saveToStorage = (newActivities: Activity[]) => {
    localStorage.setItem('activities', JSON.stringify(newActivities));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = activity.trim();
    if (!trimmed) return;

    const newActivity: Activity = {
      id: Date.now(),
      text: trimmed,
      timestamp: new Date().toLocaleString(),
    };

    const newActivities = [newActivity, ...activities];
    setActivities(newActivities);
    saveToStorage(newActivities);
    setActivity('');
  };

  return (
    <div>
      <h1>Log New Activity</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="What are you doing?"
        />
        <button type="submit">Log</button>
      </form>

      <h2>Today's Activities</h2>
      <ul>
        {activities.length === 0 ? (
          <li>No activities logged yet.</li>
        ) : (
          activities.map((act) => (
            <li key={act.id}>
              [{act.timestamp}] {act.text}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LogActivity;