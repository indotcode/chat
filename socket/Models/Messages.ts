// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import Chats from "./Chats";
import Member from "./Member";
import MessageView from "./MessageView";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)


const schema:any = new Schema({
    chats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chats
    },
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Member
    },
    text: String,
    message_id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        default: 'message'
    },
    updated_at: Date,
    created_at: Date,
    deleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('messages', schema);