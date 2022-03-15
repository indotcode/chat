// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    name: String,
    publishDate: {
        type: Date,
        required: true
    }
})

export default mongoose.model('chats', schema);