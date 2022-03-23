import User from "../Models/User";
import DataService from "../Services/DataService";
import Member from "../Models/Member";
import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        const userResult: any = await User.findOne({user_id: wsClient.user});
        await Member.updateOne({ chats: request.chats_id, user: userResult._id }, {deleted: true})
        const response: any = await DataService.chatAndMessages(userResult, request)
        wsClient.send(JSON.stringify({
            action: "OUT_CHAT",
            response: response
        }))
        const message: any = await ChatsService.addMessage(request.chats_id, wsClient.user, request.message, "out")
        ws.clients.forEach((client: any) => {
            if(client.activeChat.toString() === request.chats_id.toString()){
                client.send(JSON.stringify({
                    action: "ADD_MESSAGE",
                    response: {message}
                }))
            }
        })
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }
}