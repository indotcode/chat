import UserService from "../Services/UserService";
import ChatsService from "../Services/ChatsService"

export default async (request: any, ws: any, wsClient: any) => {
    try {
        const userResult: any = await UserService.save(request.user)
        wsClient.user = request.user.id
        const chatsResult: any = await ChatsService.result(userResult)
        let messages: any = [],
            activeChat: any = '';
        if(chatsResult.length !== 0){
            activeChat = chatsResult[0].chats._id
            messages = await ChatsService.getMessages(activeChat)
        }
        wsClient.send(JSON.stringify({
            action: request.action,
            response: {activeChat, chatsResult, messages}
        }))
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }

}