import User from "../Models/User";
import DataService from "../Services/DataService";
import Member from "../Models/Member";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        const userResult: any = await User.findOne({user_id: wsClient.user});
        await Member.updateOne({ chats: request.chats_id, user: userResult._id }, {deleted: true})
        const response: any = await DataService.chatAndMessages(userResult, request)
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