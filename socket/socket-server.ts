// @ts-ignore
import WebSocket from 'ws'
const ws = new WebSocket.Server({ port: 3001 });
import route from './route'
import Chats from './Models/Chats'

ws.on('connection', (wsClient: any) => {
    console.log('Пользователь подключился');

    wsClient.on('close', function () {
        console.log('Пользователь отключился');
    });

    wsClient.on('message', async function (message: any) {
        try {
            const response = JSON.parse(message);
            for (const item of route) {
                if(response.action === item.action){
                    await item.method(response, ws, wsClient)
                }
            }
            // switch (jsonMessage.action) {
            //     case 'ECHO':
            //         // const mes: any = await Chat.create({
            //         //     message: jsonMessage.message,
            //         //     user: jsonMessage.user,
            //         //     code: jsonMessage.code,
            //         //     publishDate: (new Date())
            //         // });
            //         // const messageItem:any = await Chat.findById(mes._id).populate('user')
            //         // ws.clients.forEach((client: any) => {
            //         //     if (client.readyState === 1 && client.code === jsonMessage.code) {
            //         //         const result = {
            //         //             type: "ITEM",
            //         //             result: messageItem
            //         //         }
            //         //         client.send(JSON.stringify(result))
            //         //     }
            //         // })
            //         break;
            // }
        } catch (error) {
            console.log('Ошибка', error);
        }
    });
});

console.log('Сервер запущен на 3001 порту');