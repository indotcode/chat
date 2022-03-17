// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    domain: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

export default mongoose.model('api_gate', schema);