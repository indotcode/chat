import DataService from "../Services/DataService";
import UserService from "../Services/UserService";
import ChatsService from "../Services/ChatsService";

export default async (request: any, ws: any, wsClient: any) => {
    const userResult: any = await UserService.save(request.user)
    const count: any = await ChatsService.getCountMessages(userResult._id)
    console.log(count)
}