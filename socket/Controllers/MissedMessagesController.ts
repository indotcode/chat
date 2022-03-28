import UserService from "../Services/UserService";
import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    const userResult: any = await UserService.save(request.user)
    const result: any = await ChatsService.getMissedMessages(userResult._id)
    wsClient.send(JSON.stringify({
        action: "MISSED_MESSAGES",
        response: result
    }))
}