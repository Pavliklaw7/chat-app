"use client"

import { useRouter } from 'next/navigation.js';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'

interface AuthUser {
  name: string
  email: string
  password: string
}

export default function Home() {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [formData, setFormData] = useState<AuthUser>({name: '', email: '', password: ''})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const url = isRegister ? '/api/auth/login' : '/api/auth/register'
    const payload = isRegister ? {email: formData.email, password: formData.password} : formData

    try {
      setIsLoading(true)
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
    } catch (error: unknown) {
     console.log(`Auth error: ${error}`) 
    } finally {
      setIsLoading(false)
    }
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start w-full w-max-xxl h-full">
        <div className='flex flex-col w-full items-center '>
          <form className='flex w-full w-max-3xl m-auto flex-col items-center'>
            <h2 className='mb-10 text-4xl font-bold'>
              {isRegister ? 'Let`s log in!' : 'Let`s sign up!'}
            </h2>
            {!isRegister && (
              <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder='Enter your Name' 
                value={formData.name}
                onChange={handleChange} 
                className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
              />
            )}
            
            <input 
              type="text" 
              name="email" 
              id="email" 
              placeholder='Enter your Email' 
              value={formData.email}
              onChange={handleChange} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
              <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Enter your Password' 
              value={formData.password}
              onChange={handleChange} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
            <button type='submit' disabled={!(formData.email.length > 3)} className="w-64 px-4 mb-4 py-2 border-2 rounded-lg cursor-pointer" onClick={handleSubmit}>
              {isLoading ? (
                <>
                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                    </svg>
                    Loading...
                </>
              ) : (
                "Go to dashboard!"
              )}
            </button>
          </form>
          <div className='flex items-center'>
            <p>
              {isRegister ?  'I don`t have an account' : 'I have an account'}
            </p>
            &nbsp;
            <button className='underline to-blue-300 cursor-pointer' onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Sign Up!' : 'Log in!'}
            </button>  
          </div>
        </div>
      </main>
    </div>
  );
}
