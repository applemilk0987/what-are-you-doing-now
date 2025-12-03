import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string;
  tag: string;
}

const TAGS = ['Work', 'Study', 'Exercise', 'Leisure', 'Other'];

const History: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) setActivities(JSON.parse(stored));
  }, []);

  const filteredActivities = filterDate
    ? activities.filter((act) => act.timestamp.startsWith(filterDate))
    : activities;

  // 태그별 카운트
  const tagCounts: Record<string, number> = {};
  TAGS.forEach(tag => tagCounts[tag] = 0);
  filteredActivities.forEach(act => tagCounts[act.tag]++);

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

      <h2>Tag Statistics</h2>
      <ul>
        {TAGS.map(tag => (
          <li key={tag}>{tag}: {tagCounts[tag]}</li>
        ))}
      </ul>

      {filteredActivities.length === 0 ? (
        <p>No activities logged for this date.</p>
      ) : (
        <ul>
          {filteredActivities.map((act) => (
            <li key={act.id}>
              [{act.timestamp}] [{act.tag}] {act.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;