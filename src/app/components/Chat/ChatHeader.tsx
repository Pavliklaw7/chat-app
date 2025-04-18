import Link from "next/link";

interface ChatHeaderProps {
    roomName: string
}
 
const ChatHeader = ({roomName}: ChatHeaderProps) => {
    return (
        <header className="flex items-center justify-between w-full mb-6">
            <h2 className="flex mb-4 text-xl font-bold">Room: {roomName}</h2>
            <Link className="underline" href="/dashboard">Return to dashboard</Link>
        </header>
    );
}
 
export default ChatHeader;
