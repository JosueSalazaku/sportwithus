import { supabase } from '@/lib/supabaseClient'
import { Month } from '@/types'
import { useEffect, useState } from 'react'

export default function CurrentMonth() {
    const realMonth = new Date().getMonth()

    
    const [thisMonth, setThisMonth] = useState<Month[]>([]);
    
    useEffect(() => {
      getCurrtentMonth();
    }, []);

  async function getCurrtentMonth() {
    try {
        const { data, error } = await supabase.from('months').select();
        if (error) {
            throw error;
        }
        console.log(data)
        setThisMonth(data)
    } catch (error) {
        console.log('Error fetching Current Month', error)
    }
  }


  return (
      <div>
          {thisMonth.map((month) => (
            <div key={month.id}>{JSON.stringify(month)}</div>
          ))}
          <h1 className='text-4xl'>{realMonth}</h1>
      </div>
  )
}

 