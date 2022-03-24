import Member from "../Models/Member";
import Chats from "../Models/Chats";
import MessageView from "../Models/MessageView";

export default class Service
{
    protected messagesPdo = async (item: any) => {
        const member: any = await Member.findById(item.member).populate('user').exec()
        const chats: any = await Chats.findById(item.chats).exec()
        const view: any = await MessageView.find({messages: item._id, member: {$ne: item.member}, view: true});
        let user: any = []
        for (const elem of view){
            const i: number = view.indexOf(elem);
            const viewMember: any = await Member.findById(elem.member, 'user').populate('user').exec()
            user[i] = viewMember.user.name
        }
        return {
            _id: item._id,
            type: item.type,
            chats: chats,
            member: member,
            user: item.member,
            view: {
                res: user,
                str: user.join(", ")
            },
            text: item.text,
            date: this.dateInfo(item.created_at)
        }
    }

    protected dateInfo = (date: any) => {
        const dates = new Date(date)
        return dates.getDate() + '.' + (dates.getUTCMonth() < 10 ? '0' + dates.getUTCMonth(): dates.getUTCMonth()) + '.' + dates.getFullYear() + ' ' + dates.toLocaleTimeString()
    }

    protected userName = (user: any) => {
        let name: any = [],
            i = 0;
        if(user.name !== null) name[i++] = user.name
        if(user.last_name !== null) name[i++] = user.last_name
        if(user.middle_name !== null) name[i++] = user.middle_name
        return name.join(" ")
    }

    protected namesChat = (user_id: any, users: any) => {
        const users_recipient: any = users.filter((item: any) => item.user._id.toString() != user_id.toString())
        let count: number = users_recipient.length
        let name: string = ''
        if(count !== 0){
            const count_set = count - 1;
            name = users_recipient[0].user.name;
            name = name + (count_set !== 0 ? ', +' + count_set : '')
            return {
                user: name,
                chat: 'Чат с ' + name
            }
        } else {
            return {
                user: 'Пустой чат',
                chat: 'Пустой чат'
            }
        }
    }
}