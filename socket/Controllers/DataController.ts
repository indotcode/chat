import UserAndChats from './../Models/UserAndChats'

export default async (response: any, ws: any, wsClient: any) => {
    const chats = await UserAndChats.find({user_id: wsClient.user}).populate('chats').then((response:any) => {
        return response.map((item:any) => {
            return {
                id: item._id,
                chats_id: item.chats._id,
            }
        })
    });
    let send: any = []
    for (const item of chats) {
        const i: any = chats.indexOf(item);
        item.ids = await UserAndChats.find({chats: item.chats_id}).then((response: any) => {
            return response.map((item: any) => {
                return item.user_id
            })
        })
        send[i] = item;
    }
    wsClient.send(JSON.stringify(send))
    // console.log(s)
}