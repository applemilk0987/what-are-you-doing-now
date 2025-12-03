import React, { useEffect, useState } from 'react';

interface Activity {
  id: number;
  text: string;
  timestamp: string; // "YYYY-MM-DD HH:MM:SS"
}

const LogActivity: React.FC = () => {
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) setActivities(JSON.parse(stored));
  }, []);

  const saveToStorage = (newActivities: Activity[]) => {
    localStorage.setItem('activities', JSON.stringify(newActivities));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = activity.trim();
    if (!trimmed) return;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timeStr = now.toLocaleTimeString();       // HH:MM:SS

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
              [{act.timestamp}] {act.text}{' '}
              <button onClick={() => handleDelete(act.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LogActivity;