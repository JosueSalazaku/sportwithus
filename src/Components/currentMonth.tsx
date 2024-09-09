import { supabase } from '@/lib/supabaseClient'
import { Month } from '@/types'
import { useEffect, useState } from 'react'

export default function CurrentMonth() {
  const monthNames = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];
    
  const realMonthIndex = new Date().getMonth(); 
  const realMonthName = monthNames[realMonthIndex]; 
  const [thisMonth, setThisMonth] = useState<Month | null>(null);

  useEffect(() => {
    getCurrtentMonth();
  });

  async function getCurrtentMonth() {
    try {
      const { data, error } = await supabase
        .from('months')
        .select('*')
        .eq('month', realMonthName); 

      if (error) {
        throw error;
      }

      setThisMonth(data[0]); 
    } catch (error) {
      console.log('Error fetching Current Month', error);
    }
  }

  return (
    <div>
      {thisMonth ? (
        <div>
          <h1 className='text-2xl font-bold'>{thisMonth.month}</h1>
          <p>Activity: {thisMonth.activity_name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <h1>{realMonthName}</h1>
    </div>
  );
}
