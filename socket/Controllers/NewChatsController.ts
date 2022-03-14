import Chats from './../Models/Chats'
import UserAndChats from './../Models/UserAndChats'

export default async (response: any, ws: any, wsClient: any) => {
    const res: any = await Chats.create({
        publishDate: (new Date())
    })
    const user_sender: any = await UserAndChats.exists({chats: res._id, user_id: response.user_sender})
    if(!user_sender){
        await UserAndChats.create({
            chats: res._id,
            user_id: response.user_sender,
            publishDate: (new Date())
        })
    }
    const user_recipient: any = await UserAndChats.exists({chats: res._id, user_id: response.user_recipient})
    if(!user_recipient){
        await UserAndChats.create({
            chats: res._id,
            user_id: response.user_recipient,
            publishDate: (new Date())
        })
    }
}