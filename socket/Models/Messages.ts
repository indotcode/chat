// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import Chats from "./Chats";
import User from "./User";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)


const schema:any = new Schema({
    chats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chats
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    message: String,
    type: {
        type: String,
        default: 'message'
    },
    publishDate: {
        type: Date,
        required: true
    }
})

export default mongoose.model('messages', schema);