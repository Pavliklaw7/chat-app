 
interface TypingIndicatorProps {
    typingUsers: string[]
}
 
const TypingIndicator = ({typingUsers}: TypingIndicatorProps) => {
    if (typingUsers.length === 0) return null
    
     return (
        <div className="text-sm text-gray-500 mb-2">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </div>
    );
}
 
export default TypingIndicator;
