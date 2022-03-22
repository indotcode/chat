// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import Messages from "./Messages";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)


const schema:any = new Schema({
    file_id: {
        type: Number,
        required: true
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Messages
    },
    read_time: {
        type: Date,
        required: false
    },
    updated_at: Date,
    created_at: Date,
    deleted_at: Date
})

export default mongoose.model('message_file', schema);