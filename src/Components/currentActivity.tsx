import { supabase } from '@/lib/supabaseClient'
import { Activities, Month } from '@/types'
import { useEffect, useRef, useState } from 'react'

export default function CurrentActivity() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [thisActivity, setThisActivity] = useState<Activities | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Month | null>(null);
  const previousActivityIdRef = useRef<number | null>(null);

  useEffect(() => {
    async function fetchCurrentMonth() {
      const realMonthIndex = new Date().getMonth();
      const realMonthName = monthNames[realMonthIndex];

      try {
        const { data, error } = await supabase
          .from('months')
          .select('*')
          .eq('month', realMonthName)
          .single();
        
        if (error) {
          throw error;
        }

        setCurrentMonth(data);
      } catch (error) {
        console.error('Error fetching Current Month:', error);
      }
    }

    async function fetchActivity(activityId: number) {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('id', activityId)
          .single();
        
        if (error) {
          throw error;
        }

        setThisActivity(data);
      } catch (error) {
        console.error('Error fetching Activity:', error);
      }
    }

    async function updateActivity() {
      await fetchCurrentMonth();

      if (currentMonth && previousActivityIdRef.current !== currentMonth.activity_id) {
        await fetchActivity(currentMonth.activity_id);
        previousActivityIdRef.current = currentMonth.activity_id;
      }
    }

    updateActivity(); // Initial fetch

    const intervalId = setInterval(updateActivity, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Use an empty dependency array to ensure this runs once and only on mount

  return (
    <div>
      {thisActivity ? (
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold'>{thisActivity.name}</h1>
          <p>Details: {thisActivity.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
