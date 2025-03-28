import { useRoom } from "@/app/context/RoomContext";
import { useState } from "react";

export default function ChatRoom({ chatId } : {chatId: string}) {
  const { socket } = useRoom();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("sendMessage", { chatId, text: message });
    setMessage("");
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}
