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
            if(message !== 'ping'){
                const response = JSON.parse(message);
                for (const item of route) {
                    if(response.action === item.action){
                        await item.method(response, ws, wsClient)
                    }
                }
            }
        } catch (e) {
            console.log('Ошибка', e);
        }
    });
});

console.log('Сервер запущен на 3001 порту');