/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import ChatForm from "@/app/components/Chat/ChatForm";
import ChatHeader from "@/app/components/Chat/ChatHeader";
import ChatMessage from "@/app/components/Chat/ChatMessage";
import { useAuth } from "@/app/contexts/AuthContext";
import { socket } from "@/app/lib/socketClient";
import { IMessage } from "@/app/models/Message";
import { IRoom } from "@/app/models/Room";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function ChatRoom() {
  const { id } = useParams();
  const roomId = typeof id === "string" ? id : id?.[0];

  const [room, setRoom] = useState<IRoom | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoadingRoom, setIsLoadingRoom] = useState<boolean>(false)

  const now = useMemo(() => Date.now(), [])

  const {user, isLoading: isLoadingUser} = useAuth()

  const hasJoined = useRef(false)


  const fetchRoom = useCallback(async () => {
    if (!roomId) return;

    try {
      setIsLoadingRoom(true)
      const res = await fetch(`/api/rooms/${roomId}`);
      const data = await res.json();
      setRoom(data.room)
      setMessages(data.messages)
    } catch (error: unknown) {
      console.error("Get room error", error);
    } finally {
      setIsLoadingRoom(false)
    }
  }, [roomId])

  useEffect(() => {
    if (!socket) return

    const handleMessage = (data: IMessage) => {
      setMessages((prev) => [...prev, data]);
    }

    const handleUserJoined = (username: string) => {
      // @ts-ignore
      setMessages((prev) => [
        ...prev,
        {
          room: roomId,
          sender: "system",
          content: username,
          timestamp: now,
        },
      ]);
    }

    socket.on("message", handleMessage);
    socket.on("user_joined", handleUserJoined);

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, [roomId, socket]);

  useEffect(() => {
    if (socket && roomId && user && !hasJoined.current) {
      socket.emit("join-room", {roomId, username: user.name})
      hasJoined.current = true
    }
  }, [user, socket, roomId])

  useEffect(() => {
    fetchRoom()
  }, [fetchRoom])

  const handleSendMessage = useCallback((message: string) => {
    if (!room || !user || !socket) return console.log('Room, user or socket not exists!');
    
    const msg: IMessage = {
      roomId: room._id,
      sender: user.name,
      content: message,
      // @ts-ignore
      timestamp: now,
    };

    socket.emit("message", msg);
    setMessages((prev) => [...prev, msg]); 
  }, [room, user, socket])


  if (isLoadingUser || isLoadingRoom) {
    return (
      <div className="animate-pulse text-gray-400">Loading chat...</div>
    );
  }

  if (!user || !room) return <div> No User or Room! </div>
  
  return (
    <div className="flex flex-col w-full h-full">
      <ChatHeader roomName={room.name}/>
      <div className="grow min-h-44 px-4 py-2 mb-4 border-2 rounded-lg overflow-y-auto scrollbar-hide">
        {messages.map(({ content, sender }, i) => (
          <ChatMessage
            key={i}
            message={content}
            sender={sender}
            isOwnMessage={sender === user.name}
          />
        ))}
      </div>
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
}
