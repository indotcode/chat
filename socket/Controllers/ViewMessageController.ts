import ChatsService from "../Services/ChatsService";
import Messages from "../Models/Messages";
import MessageView from "../Models/MessageView";
import DataService from "../Services/DataService";

export default async (request: any, ws: any, wsClient: any) => {
    await DataService.messageView(ws, wsClient)
}