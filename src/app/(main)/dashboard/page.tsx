 
"use client"

import React, { FormEvent, useCallback } from 'react'
import { IRoom } from '@/app/models/Room'
import RoomCard from '@/app/components/RoomCard'
import { useAuth } from '@/app/contexts/AuthContext'

export default function Home() {    
    const [roomName, setRoomName] = React.useState<string>('')
    const [rooms, setRooms] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const { logout } = useAuth()

    const fetchRooms = useCallback(async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/rooms')
        const data = await res.json()
        setRooms(data.rooms) 
      } catch (error) {
        console.log('Rooms load error', error)
      } finally {
        setIsLoading(false)
      }

    }, []) 

    const createRoom = useCallback(async (e: FormEvent) => {
      e.preventDefault()

      if (!roomName.trim()) return alert('room name can`t be empty!')        
      
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({roomName}),
      })

      if (res.ok) {
        fetchRooms()
      } else {
        const data = await res.json()
        alert(data.error || 'error')        
      }
      setRoomName("");
    }, [roomName, fetchRooms])

    React.useEffect(() => {
      fetchRooms()
    }, [fetchRooms])
  
  return (
    <div className="flex flex-col p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className='w-full'>
          <h2 className='mb-4 text-4xl font-bold'>Join the Room!</h2>
          <div className='flex items-center w-full'>
            <form className='flex items-center gap-4'>
              <input className='rounded-2 border p-2' value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Название чата" />
              <button type='submit' onClick={createRoom}>Создать чат</button>
            </form>
            <button className='ml-auto' onClick={logout}>Log out</button>    
          </div>
      </header>
      <main className="flex gap-[32px] w-full w-max-xxl">
        {isLoading ? (
            <div className='grow flex items-center justify-center'>
              Rooms are loading...
            </div>
        ) : rooms.length === 0 ? (
          <div className='grow flex items-center justify-center'>
            Create first room to start communicate!
          </div>
        ) : (
          <div className='grid grid-cols-5 gap-4 grow'>
            {rooms.map((room: IRoom) => (
              <RoomCard key={room._id} room={room}/>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
