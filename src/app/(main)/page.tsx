"use client"

import { useRouter } from 'next/navigation.js';
import React from 'react'

export default function Home() {
  const [isRegister, setIsRegister] = React.useState(true)
  const [formData, setFormData] = React.useState({name: '', email: '', password: ''})

  const router = useRouter()

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = isRegister ? '/api/auth/login' : '/api/auth/register'
    const payload = isRegister ? {email: formData.email, password: formData.password} : formData
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()

    if (res.ok) {
      router.push('/dashboard')
    } else {
      console.log(data.error || 'Error')
    }
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start w-full w-max-xxl h-full">
        <div className='flex flex-col w-full items-center '>
          <form className='flex w-full w-max-3xl m-auto flex-col items-center'>
            <h2 className='mb-4 text-4xl font-bold'>
              {isRegister ? 'Let`s log in!' : 'Let`s sign up!'}
            </h2>
            {!isRegister && (
              <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder='Enter your Name' 
                value={formData.name}
                onChange={handleFormDataChange} 
                className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
              />
            )}
            
            <input 
              type="text" 
              name="email" 
              id="email" 
              placeholder='Enter your Email' 
              value={formData.email}
              onChange={handleFormDataChange} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
              <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Enter your Password' 
              value={formData.password}
              onChange={handleFormDataChange} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
            <button type='submit' disabled={!(formData.email.length > 3)} className={`w-64 px-4 mb-4 py-2 border-2 rounded-lg`} onClick={handleSubmit}>Go to dashboard!</button>
          </form>
          <div className='flex items-center'>
            <p>
              {isRegister ?  'I don`t have an account' : 'I have an account'}
            </p>
            &nbsp;
            <button className='underline to-blue-300' onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Sign Up!' : 'Log in!'}
            </button>  
          </div>
        </div>
      </main>
    </div>
  );
}
