import UserAndChats from "../Models/UserAndChats";
import {dateInfo} from "../Helper/date"

class ChatsService
{
    result = async (userResult: any) => {
        const user_id = userResult._id
        const chats: any = await UserAndChats.find({user: user_id}).populate('chats').then((response:any) => {
            return response.map((item:any) => {
                return {
                    chats: item.chats,
                    dateInit: dateInfo(item.chats.publishDate)
                }
            })
        });
        let send: any = []
        for (const item of chats) {
            const i: any = chats.indexOf(item);
            item.users = await UserAndChats.find({chats: item.chats._id}).populate('user').then((response: any) => {
                return response.map((item: any) => {
                    return item
                })
            })
            send[i] = item;
        }
        return send;
    }
}

export default new ChatsService()