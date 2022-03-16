// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import User from "./User";
import Messages from "./Messages";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)


const schema:any = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Messages
    },
    view: {
        type: Boolean,
        default: false
    },
})

export default mongoose.model('messages_view', schema);