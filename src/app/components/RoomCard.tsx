import { useRouter } from "next/navigation";
import { IRoom } from "../models/Room";

interface RoomCardProps {
    room: IRoom
}
 
const RoomCard = ({room}: RoomCardProps) => {
    const router = useRouter()

    return ( 
        <div className='flex items-center justify-center w-40 h-40 border rounded-2xl cursor-pointer' key={room._id as string} onClick={() => router.push(`/chat/${room._id}`)}>
            <h4>{room.name}</h4>
        </div>
     );
}
 
export default RoomCard;
