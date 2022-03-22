import Chats from './../Models/Chats'
import UserService from "../Services/UserService";
import name from "../Helper/name";
import Member from "../Models/Member";

export default async (request: any, ws: any, wsClient: any) => {
    try {
        let users: any = [
            await UserService.save(request.user_sender),
            await UserService.save(request.user_recipient)
        ];
        const number: number = await Chats.estimatedDocumentCount();
        const res: any = await Chats.create({
            name: name(request.user_recipient),
            number: number + 1,
            chat_key: request.chat_key,
            updated_at: (new Date()),
            created_at: (new Date())
        })

        for (const user of users) {
            await Member.create({
                chats: res._id,
                user: user._id,
                updated_at: (new Date()),
                created_at: (new Date())
            })
        }
    } catch (err){
        wsClient.send(JSON.stringify({
            action: "ERROR",
            response: err
        }))
    }
}