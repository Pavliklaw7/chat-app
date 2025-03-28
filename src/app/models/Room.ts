import mongoose, { Document, Model, Schema } from "mongoose"

export interface IRoom extends Document {
    name: string
}

const RoomSchema = new Schema<IRoom>({
    name: {type: String, required: true, unique: true},
})

const Room: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;

