import ChatsService from "../Services/ChatsService";
import Member from "../Models/Member";

export default async (request: any, ws: any, wsClient: any) => {
    const message: any = await ChatsService.addMessage(request.chats_id, wsClient.user, request.message)
    ws.clients.forEach((client: any) => {
        if(client.activeChat.toString() === request.chats_id.toString()){
            client.send(JSON.stringify({
                action: request.action,
                response: {message}
            }))
        }
    })
}