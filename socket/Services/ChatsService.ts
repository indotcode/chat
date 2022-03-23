import User from "../Models/User";
import Messages from "../Models/Messages";
import Member from "../Models/Member";
import Chats from "../Models/Chats";
import UserService from "./UserService";
import Service from "./Service";

class ChatsService extends Service
{
    public result = async (userResult: any, request: any) => {
        const user_id: any = userResult._id
        const chats: any = await Member.find({user: user_id, deleted: false}).sort({field: 'asc', publishDate: -1}).populate('chats').then((response:any) => {
            return response.map((item:any) => {
                if(request.chat_key === item.chats.chat_key){
                    return {
                        chats: item.chats,
                        date: this.dateInfo(item.chats.created_at)
                    }
                }
            })
        });
        let send: any = []
        for (const item of chats) {
            const i: any = chats.indexOf(item);
            item.users = await Member.find({chats: item.chats._id}).populate('user').then((response: any) => {
                return response.map((item: any) => {
                    return item
                })
            })
            item.names = this.namesChat(user_id, item.users)
            send[i] = item;
        }
        return send;
    }

    public addMessage = async (chats_id: any, user_id: any, text: string, type: string = "message") => {
        const user: any = await User.findOne({user_id: user_id})
        const member: any = await Member.findOne({chats: chats_id, user: user._id})
        const messages: any = await Messages.create({
            chats: chats_id,
            member: member._id,
            type: type,
            text: text,
            updated_at: (new Date()),
            created_at: (new Date())
        })
        // // await UserAndChats.find({chats: chats_id}, 'user').then(r => r.map(async (idUser: any) => {
        // //     await MessagesView.create({
        // //         user: idUser.user,
        // //         messages: messages._id,
        // //         view: idUser.user.toString() === user._id.toString()
        // //     })
        // // }))
        const message: any =  await Messages.findById(messages._id);
        return await this.messagesPdo(message)
    }

    public getMessages = async (chats_id: any) => {
        const messages: any = await Messages.find({chats: chats_id}).exec();
        let result: any = []
        for (const item of messages){
            const i: any = messages.indexOf(item);
            result[i] = await this.messagesPdo(item)
        }
        return result;
    }

    public  addNewChats = async (user_sender: any, user_recipient: any, chat_key: string) => {
        let users: any = [
            await UserService.save(user_sender),
            await UserService.save(user_recipient)
        ];
        let number: number = await Chats.estimatedDocumentCount();
        number = number + 1;
        const res: any = await Chats.create({
            name: 'Новый чат №' + number,
            number: number,
            chat_key: chat_key,
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
    }
}


export default new ChatsService()