import UserService from "../Services/UserService";
import DataService from "../Services/DataService";
import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        const userResult: any = await UserService.save(request.user)
        wsClient.user = request.user.id
        const response: any = await DataService.chatAndMessages(userResult, request)
        wsClient.userSystem = userResult._id
        wsClient.activeChat = response.activeChat
        const memberOne: any = await ChatsService.getMemberOne(response.activeChat, userResult._id)
        wsClient.member = memberOne._id;
        wsClient.send(JSON.stringify({
            action: "DATA",
            response: response
        }))
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }

}