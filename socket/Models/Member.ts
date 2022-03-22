// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import Chats from "./Chats"
import User from "./User";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)


const schema:any = new Schema({
    chats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chats
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    updated_at: Date,
    created_at: Date,
    deleted_at: Date
})

export default mongoose.model('member', schema);