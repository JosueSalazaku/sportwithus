import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import type { Activities } from '@/types';

export default function Activities() {
  const [activities, setActivities] = useState<Activities[]>([]);
  useEffect(() => {
    getActivities();
  }, []);

  async function getActivities() {
    try {
      const { data, error } = await supabase.from('activities').select();
      if (error) {
        throw error;
      }
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }

  return (
    <div>
      <h1>Activities</h1>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
}