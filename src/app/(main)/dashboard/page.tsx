"use client"

import React from 'react'
// import { useRoom } from '../../context/RoomContext'
import { useRouter } from 'next/navigation'
import { IRoom } from '@/app/models/Room'

export default function Home() {
    // const {socket} = useRoom()
    
    const [room, setRoom] = React.useState<string>('')
    const [rooms, setRooms] = React.useState([])

    const router = useRouter()

    const fetchRooms = async () => {
      const res = await fetch('/api/rooms')
      const data = await res.json()
      setRooms(data.rooms) 
    }

    const createRoom = async () => {

        // socket.emit("createChat", {room});

        const res = await fetch('/api/rooms/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({room}),
        })

        if (res.ok) {
          fetchRooms()
        } else {
          const data = await res.json()
          alert(data.error || 'error')        
        }
        setRoom("");
      };

      const logoutHandler = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/')
      }

      React.useEffect(() => {
        fetchRooms()
      }, [])

//   const handleJoinRoom = () => {
//     if (room && userName) {
//       socket.emit("join-room", {room, username: userName})
//       setJoined(true)
//     }
//   }

//   const handleSendMessage = (message: string) => {
//     const data = {room, message, sender: userName}
//     setMessages(prev => [...prev, {sender: userName, message}])
//     socket.emit("message", data)
//   }

//   React.useEffect(() => {
//     socket.on("message", (data) => {
//       setMessages((prev) => [...prev, data])
//     })

//     socket.on("user_joined", (data) => {
//       setMessages((prev) => [...prev, {sender: "system", message: data}])
//     })

//     return () => {
//       socket.off("user_joined")
//       socket.off("message")
//     }
//   }, [])
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
          <h2 className='mb-4 text-4xl font-bold'>Join the Room!</h2>
          <div className='flex items-center gap-1 justify-start'>
            <input className='rounded border p-1' value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Название чата" />
            <button onClick={createRoom}>Создать чат</button>
            <button onClick={logoutHandler}>Log out</button>     
          </div>
          
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full w-max-xxl h-full">
           
        <div className='grow'>
          {rooms.map((room: IRoom) => (
            <div className='flex items-center justify-center w-40 h-40 border rounded-2xl cursor-pointer' key={room._id as string}>
              <h4>{room.name}</h4>
            </div>
          ))}
        </div>
     
        {/* {!joined ? (
          <form className='flex w-full w-max-3xl m-auto flex-col items-center'>
            <h2 className='mb-4 text-4xl font-bold'>Join the Room!</h2>
            <input 
              type="text" 
              name="userName" 
              id="userName" 
              placeholder='Enter your userName' 
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
            <input 
              type="text" 
              name="room" 
              id="room" 
              placeholder='Enter your room' 
              value={room}
              onChange={(e) => setRoom(e.target.value)} 
              className='w-64 px-4 py-2 mb-4 border-2 rounded-lg'
            />
            <button type='submit' disabled={!(userName.length > 3)} className={`w-64 px-4 py-2 border-2 rounded-lg`} onClick={handleJoinRoom}>Join Room!</button>
          </form>
        ) : (
          <div className='flex flex-col w-full h-full'>
            <h2 className="flex mb-4 text-xl font-bold">
              Room: {room}
            </h2>
            <div className='grow px-4 py-2 mb-4 border-2 rounded-lg'>
              {messages?.map(({message, sender}: Message, i: number) => (
                <ChatMessage key={i} message={message} sender={sender} isOwnMessage={sender === userName} />
              ))}
            </div>
            <ChatForm onSendMessage={(val) => handleSendMessage(val)}/>
          </div>
        )} */}
      </main>
    </div>
  );
}
