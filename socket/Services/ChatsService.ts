import {dateInfo} from "../Helper/date"
import User from "../Models/User";
import Messages from "../Models/Messages";
import MessageView from "../Models/MessageView";
import Member from "../Models/Member";
import Chats from "../Models/Chats";

class ChatsService
{
    public result = async (userResult: any, request: any) => {
        const user_id = userResult._id
        const chats: any = await Member.find({user: user_id}).sort({field: 'asc', publishDate: -1}).populate('chats').then((response:any) => {
            return response.map((item:any) => {
                if(request.chat_key === item.chats.chat_key){
                    return {
                        chats: item.chats,
                        date: dateInfo(item.chats.created_at)
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
            send[i] = item;
        }
        return send;
    }

    public addMessage = async (chats_id: any, user_id: any, text: String) => {
        const user: any = await User.findOne({user_id: user_id})
        const member: any = await Member.findOne({chats: chats_id, user: user._id})
        const messages: any = await Messages.create({
            chats: chats_id,
            member: member._id,
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
        return await Messages.findById(messages._id).then(async (item:any) => {
            return this.messages(item)
        });
    }

    public getMessages = async (chats_id: any) => {
        return await Messages.find({chats: chats_id}).then((res:any) => {
            return res.map((item: any) => {
                return this.messages(item)
            })
        });
    }

    private messages = (item: any) => {
        const member: any = Member.findById(item.member).populate('user').exec()
        // const chats: any = await Chats.findById(item.chats).exec()
        return {
            _id: item._id,
            type: item.type,
            // chats: chats,
            // member: member,
            text: item.text,
            date: dateInfo(item.created_at)
        }
    }

    // private messages = (item: any) => {
    //     console.log(item)
    //     // const member: any = await Member.findById(item.member).populate('user').exec()
    //     // const chats: any = await Chats.findById(item.chats).exec()
    //     // let data = {
    //     //     _id: item._id,
    //     //     type: item.type,
    //     //     chats: chats,
    //     //     member: member,
    //     //     text: item.text,
    //     //     date: dateInfo(item.created_at)
    //     // }
    //     // console.log(data)
    //     return {
    //         _id: item._id,
    //         type: item.type,
    //         // chats: chats,
    //         // member: member,
    //         text: item.text,
    //         date: dateInfo(item.created_at)
    //     }
    // }
}


export default new ChatsService()