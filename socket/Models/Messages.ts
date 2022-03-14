// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import Chats from "./Chats";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)


const schema:any = new Schema({
    name: String,
    chats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chats
    },
    user_id: Number,
    message: String,
    type: {
        type: String,
        default: 'message'
    },
    view: {
        type: Boolean,
        default: false
    },
    publishDate: {
        type: Date,
        required: true
    }
})

export default mongoose.model('messages', schema);