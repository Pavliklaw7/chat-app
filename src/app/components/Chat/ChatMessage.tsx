interface ChatMessageProps {
    sender: string
    message: string
    isOwnMessage: boolean
    isSystemMessage?: boolean
}
 
export default function ChatMessage({sender, message, isOwnMessage, isSystemMessage}: ChatMessageProps) {
    return ( <div className={`flex ${isSystemMessage ? 'justify-center' : isOwnMessage ? 'justify-end': 'justify-start'} mb-3`}> 
    <div>
        {!isSystemMessage && <p className="text-sm">{sender}</p>}
        <p>{message}</p>
    </div>

    </div>);
}
