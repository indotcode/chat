import UserAndChats from './../Models/UserAndChats'
export default (response: any, ws: any, wsClient: any) => {
    wsClient.user = response.user
}