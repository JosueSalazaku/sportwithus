import { supabase } from '@/lib/supabaseClient'
import { Month } from '@/types'
import { useEffect, useRef, useState } from 'react'

export default function CurrentMonth() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [thisMonth, setThisMonth] = useState<Month | null>(null);
  const previousMonthRef = useRef<number | null>(null);
  
  useEffect(() => {
    async function updateMonth() {
      const realMonthIndex = new Date().getMonth();
      const realMonthName = monthNames[realMonthIndex];
      console.log(realMonthName);

      if (previousMonthRef.current !== realMonthIndex) {
        try {
          const { data, error } = await supabase
            .from('months')
            .select('*')
            .eq('month', realMonthName);

          if (error) {
            throw error;
          }

          setThisMonth(data[0]);
          previousMonthRef.current = realMonthIndex; // Update the ref to the current month index
        } catch (error) {
          console.log('Error fetching Current Month', error);
        }
      }
    }
    // Initial fetch
    updateMonth();

    const intervalId = setInterval(updateMonth, 65000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {thisMonth ? (
        <div>
          <h1 className='text-4xl font-bold'>{thisMonth.month}</h1>
          {/* <p>Activity: {thisMonth.activity_name}</p> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
