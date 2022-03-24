import DataService from "../Services/DataService";

export default async (request: any, ws: any, wsClient: any) => {
    await DataService.messageView(ws, wsClient)
}