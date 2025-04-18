import mongoose, { Document, Model, Schema } from "mongoose"

export interface IRoom extends Document {
    _id: string
    name: string
    creatorId: string
    lastActivity: Date
}

const RoomSchema = new Schema<IRoom>({
    name: {type: String, required: true, unique: true},
    creatorId: {type: String, required: true},
    lastActivity: { type: Date, default: Date.now }
}, { timestamps: true })

const Room: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;

