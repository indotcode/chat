import ChatsService from "./ChatsService";

class DataService
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
}

export default new DataService()