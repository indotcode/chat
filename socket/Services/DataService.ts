import ChatsService from "./ChatsService";
import Service from "./Service";
import Messages from "../Models/Messages";
import MessageView from "../Models/MessageView";

class DataService extends Service
{
    public chatAndMessages = async (userResult: any, request: any) => {
        const chatsResult: any = await ChatsService.result(userResult, request)
        let messages: any = [],
            activeChat: any = '';
        if(chatsResult.length !== 0){
            activeChat = chatsResult[0].chats._id
            messages = await ChatsService.getMessages(activeChat)
        }
        return {activeChat, chatsResult, messages}
    }

    public messageView = async (ws: any, wsClient: any) => {
        const chats_id: any = wsClient.activeChat
        const member_id: any = wsClient.member
        const messages: any = await Messages.find({chats: chats_id, member: {$ne: member_id}}, '_id').populate('views')
        for(const item of messages){
            const view: any = await MessageView.findOne({member: member_id, messages: item._id, view: false}, '_id')
            if(view !== null){
                await MessageView.updateOne({_id: view._id}, {view: true, updated_at: (new Date())})
                let message: any = await Messages.findById(item._id)
                message = await this.messagesPdo(message)
                ws.clients.forEach((client: any) => {
                    if(client.activeChat.toString() === chats_id.toString()){
                        client.send(JSON.stringify({
                            action: "VIEW_MESSAGE",
                            response: {message}
                        }))
                    }
                })
            }
        }
    }
}

export default new DataService()