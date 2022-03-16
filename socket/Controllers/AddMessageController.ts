import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    const message: any = await ChatsService.addMessage(request.chats_id, wsClient.user, request.message)
    wsClient.send(JSON.stringify({
        action: request.action,
        response: {message}
    }))
}