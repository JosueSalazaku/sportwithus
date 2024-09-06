import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import { Month } from '@/types';

export default function Months() {
  const [months, setMonths] = useState<Month[]>([]);
  useEffect(() => {
    getMonths();
  }, []);

  async function getMonths() {
    try {
      const { data, error } = await supabase.from('months').select();
      if (error) {
        throw error;
      }
      console.log(data);
      setMonths(data);
    } catch (error) {
      console.error('Error fetching months:', error);
    }
  }

  return (
    <div>
      <h1>Months</h1>
      <ul>
        {months.length > 0 ? (
          months.map((month) => (
            <li key={month.id}>
                  {month.month}
                  {month.activityName}
            </li>
          ))
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
}
