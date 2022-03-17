import Chats from './../Models/Chats'
import UserAndChats from './../Models/UserAndChats'
import UserService from "../Services/UserService";
import name from "../Helper/name";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        const user_sender_res: any = await UserService.save(request.user_sender)
        const user_recipient_res: any = await UserService.save(request.user_recipient)
        const res: any = await Chats.create({
            name: name(request.user_recipient),
            publishDate: (new Date())
        })

        const user_sender: any = await UserAndChats.exists({chats: res._id, user: user_sender_res._id})
        if(!user_sender){
            await UserAndChats.create({
                chats: res._id,
                user: user_sender_res._id,
                publishDate: (new Date())
            })
        }

        const user_recipient: any = await UserAndChats.exists({chats: res._id, user: user_recipient_res._id})
        if(!user_recipient){
            await UserAndChats.create({
                chats: res._id,
                user: user_recipient_res._id,
                publishDate: (new Date())
            })
        }
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }
}