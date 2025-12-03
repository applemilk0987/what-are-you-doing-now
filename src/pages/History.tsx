import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string; // "YYYY-MM-DD HH:MM:SS"
}

const History: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) setActivities(JSON.parse(stored));
  }, []);

  // filterDate = "YYYY-MM-DD"로 입력되면 timestamp 앞부분과 매칭
  const filteredActivities = filterDate
    ? activities.filter((act) => act.timestamp.startsWith(filterDate))
    : activities;

  return (
    <div>
      <h1>Activity History</h1>

      <label>
        Filter by date:
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </label>

      {filteredActivities.length === 0 ? (
        <p>No activities logged for this date.</p>
      ) : (
        <ul>
          {filteredActivities.map((act) => (
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