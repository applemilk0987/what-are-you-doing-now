import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string;
}

const History: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  // 페이지 로딩 시 로컬스토리지에서 기록 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1>Activity History</h1>
      {activities.length === 0 ? (
        <p>No activities logged yet.</p>
      ) : (
        <ul>
          {activities.map((act) => (
            <li key={act.id}>
              [{act.timestamp}] {act.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;