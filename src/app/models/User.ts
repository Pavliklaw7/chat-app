import mongoose, { Document, Schema } from "mongoose"

interface IUser extends Document {
    name: string
    email: string
    password: string
}

const UserSchema = new Schema<IUser>({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true },
    password: {type: String, required: true, unique: true}
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
