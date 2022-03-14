// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
import UserAndChats from "./UserAndChats";
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    publishDate: {
        type: Date,
        required: true
    }
})

export default mongoose.model('chats', schema);