import { IMessage } from "@/app/models/Message";
import ChatMessage from "./ChatMessage";

interface MessageListProps {
    messages: IMessage[]
}
 
const MessageList = ({messages}: MessageListProps) => {
    const user = 'test'
    return (
        <div className="grow min-h-44 px-4 py-2 mb-4 border-2 rounded-lg overflow-y-auto">
            {messages.map(({ content, sender }, i) => (
                <ChatMessage
                    key={i}
                    message={content}
                    sender={sender}
                    isOwnMessage={sender === user}
                />
            ))}
        </div>
    );
}
 
export default MessageList;