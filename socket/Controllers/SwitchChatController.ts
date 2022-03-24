import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    const messages: any = await ChatsService.getMessages(request.chats_id)
    wsClient.activeChat = request.chats_id
    const memberOne: any = await ChatsService.getMemberOne(request.chats_id, wsClient.userSystem)
    wsClient.member = memberOne._id;
    wsClient.send(JSON.stringify({
        action: "SWITCH_CHAT",
        response: {messages}
    }))
}