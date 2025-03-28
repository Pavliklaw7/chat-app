"use client"

import React from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [username, setUserName] = React.useState<string>('')

  const router = useRouter()

  const handleLogin = () => {
    localStorage.setItem("username", username);
    router.push("/dashboard");
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full w-max-xxl h-full">
          <form className='flex w-full w-max-3xl m-auto flex-col items-center'>
            <h2 className='mb-4 text-4xl font-bold'>Enter your name!</h2>
            <input 
              type="text" 
              name="userName" 
              id="userName" 
              placeholder='Enter your userName' 
              value={username}
              onChange={(e) => setUserName(e.target.value)} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
            <button type='submit' disabled={!(username.length > 3)} className={`w-64 px-4 py-2 border-2 rounded-lg`} onClick={handleLogin}>Go to dashboard!</button>
          </form>
      </main>
    </div>
  );
}
