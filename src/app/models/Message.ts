import mongoose, { Document, Schema, Types } from "mongoose"

interface IMessage extends Document {
    roomId: Types.ObjectId
    sender: string
    message: string
    timestamp: Date
}

const MessageSchema = new Schema<IMessage>({
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    sender: {type: String, required: true, unique: true},
    message: {type: String, required: true },
    timestamp: {type: Date, default: Date.now()}
})

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema)
