import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        await ChatsService.addNewChats(request.user_sender, request.user_recipient, request.chat_key)
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }
}