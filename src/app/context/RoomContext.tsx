'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { IRoom } from "../models/Room";
import { socket } from "../lib/socketClient";

interface RoomContextType {
  socket: typeof socket;
  userName: string | null;
  setUserName: (name: string | null) => void;
  rooms: IRoom[];
  setRooms: (rooms: IRoom[]) => void;
}

const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem("username") || null);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    const handleNewRoom = (room: IRoom) => {
      setRooms((prev) => [...prev, room]);
    };

    socket.on("chatCreated", handleNewRoom);

    return () => {
      socket.off("chatCreated", handleNewRoom);
    };
  }, []);

  return (
    <RoomContext.Provider value={{ socket, userName, setUserName, rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};
