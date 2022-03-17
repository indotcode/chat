import UserAndChats from "../Models/UserAndChats";
import {dateInfo} from "../Helper/date"
import {messageConvert} from "../Helper/convert"
import User from "../Models/User";
import Messages from "../Models/Messages";
import MessagesView from "../Models/MessagesView";

class ChatsService
{
    result = async (userResult: any) => {
        const user_id = userResult._id
        const chats: any = await UserAndChats.find({user: user_id}).sort({field: 'asc', publishDate: -1}).populate('chats').then((response:any) => {
            return response.map((item:any) => {
                return {
                    chats: item.chats,
                    date: dateInfo(item.chats.publishDate)
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

    addMessage = async (chats_id: any, user_id: any, message: String) => {
        const user: any = await User.findOne({user_id: user_id})
        const messages: any = await Messages.create({
            chats: chats_id,
            user: user._id,
            message: message,
            publishDate: (new Date())
        })
        await UserAndChats.find({chats: chats_id}, 'user').then(r => r.map(async (idUser: any) => {
            await MessagesView.create({
                user: idUser.user,
                messages: messages._id,
                view: idUser.user.toString() === user._id.toString()
            })
        }))
        return await Messages.findById(messages._id).populate('user').then(async (res:any) => {
            return messageConvert(res)
        });
    }

    getMessages = async (chats_id: any) => {
        return await Messages.find({chats: chats_id}).populate('user').then((res:any) => {
            return res.map((item: any) => {
                return messageConvert(item)
            })
        });
    }
}

export default new ChatsService()