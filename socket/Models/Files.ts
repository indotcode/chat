// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    name: String,
    url: String,
    type: String,
    updated_at: Date,
    created_at: Date,
    deleted: {
        type: Boolean,
        default: false
    }
})
export default mongoose.model('files', schema);