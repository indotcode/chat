import UserService from "../Services/UserService";

export default async (request: any, ws: any, wsClient: any) => {
    await UserService.save(request.user)
    wsClient.user = request.user.id
}