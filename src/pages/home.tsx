import Activities from "@/Components/activities"
import CurrentMonth from "@/Components/currentMonth";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

export default function Home() {

  const [count, setCount] = useState(0)
  function addCount() {
    setCount(count + 1)
  }
    return (
      <main className='w-screen h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-6'>
          <h1 className='text-6xl font-black'>SPORT WITH US</h1>
          <p className="text-2xl font-medium">COMING SOON</p>
          <CurrentMonth />
          <Activities />
          <Button onClick={addCount}>CLICK HER TO JOIN {count}</Button>
        </div>

      </main>
    )
  }
  