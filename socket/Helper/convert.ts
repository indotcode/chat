import {dateInfo} from "./date";

export function messageConvert(res: any){
    return {
        _id: res._id,
        type: res.type,
        chats: res.chats,
        user: res.user,
        message: res.message,
        date: dateInfo(res.publishDate)
    }
}