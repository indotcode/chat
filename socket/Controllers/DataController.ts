import UserService from "../Services/UserService";
import DataService from "../Services/DataService";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        const userResult: any = await UserService.save(request.user)
        wsClient.user = request.user.id
        const response: any = await DataService.chatAndMessages(userResult, request)
        wsClient.userSystem = userResult._id
        wsClient.activeChat = response.activeChat
        wsClient.send(JSON.stringify({
            action: request.action,
            response: response
        }))
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }

}