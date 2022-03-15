// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import UserAndChats from "./UserAndChats";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    user_id: Number,
    name: String,
    slug: String,
    role: Number,
    phone: String,
    email: String,
    visitDate: {
        type: Date,
        required: true
    }
})

export default mongoose.model('user', schema);