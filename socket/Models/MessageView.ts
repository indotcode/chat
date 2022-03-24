// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import Messages from "./Messages";
import Member from "./Member";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Member
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Messages
    },
    view: {
        type: Boolean,
        default: false
    },
    updated_at: Date,
    created_at: Date,
    deleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('message_view', schema);