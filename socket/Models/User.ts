// @ts-ignore
import mongoose from "mongoose"
import config from "./../config"
const { Schema } = mongoose
mongoose.connect(config.connect, config.params)

const schema:any = new Schema({
    user_id: Number,
    name: String,
    slug: String,
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    visit_at: {
        type: Date,
        required: true
    },
    updated_at: Date,
    created_at: Date,
    deleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('user', schema);