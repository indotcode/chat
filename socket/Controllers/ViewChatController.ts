import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    const messages: any = await ChatsService.getMessages(request.chats_id)
    wsClient.activeChat = request.chats_id
    wsClient.send(JSON.stringify({
        action: "VIEW_CHAT",
        response: {messages}
    }))
}