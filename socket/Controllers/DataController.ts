import UserAndChats from './../Models/UserAndChats'
import User from "../Models/User";
import UserService from "../Services/UserService";
import ChatsService from "../Services/ChatsService"

export default async (request: any, ws: any, wsClient: any) => {
    const userResult: any = await UserService.save(request.user).then()
    wsClient.user = request.user.id
    const chatsResult: any = await ChatsService.result(userResult)
    const activeChat = chatsResult[0].chats._id
    wsClient.send(JSON.stringify({
        action: request.action,
        response: {activeChat, chatsResult}
    }))
}