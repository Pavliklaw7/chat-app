import mongoose, { Document, Schema } from "mongoose"

export interface IMessage extends Document {
    roomId: string
    sender: string
    content: string
    timestamp: Date
}

const MessageSchema = new Schema<IMessage>({
    roomId: {type: String, ref: "Room", required: true },
    sender: {type: String, required: true},
    content: {type: String, required: true },
    timestamp: {type: Date}
})

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema)
