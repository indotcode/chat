export default [
    {
        //Инициализация чата
        action: 'DATA',
        method: require('./Controllers/DataController').default
    },
    {
        //Создания нового чата
        action: 'NEW_CHATS',
        method: require('./Controllers/NewChatsController').default
    },
    {
        //Переключения чата
        action: 'SWITCH_CHAT',
        method: require('./Controllers/SwitchChatController').default
    },
    {
        //Выход пользователя из чата
        action: 'OUT_CHAT',
        method: require('./Controllers/OutChatController').default
    },
    {
        //Отправка сообщения
        action: 'ADD_MESSAGE',
        method: require('./Controllers/AddMessageController').default
    },
    {
        //Просмотр сообщения
        action: 'VIEW_MESSAGE',
        method: require('./Controllers/ViewMessageController').default
    },
    {
        //Не просмотренные сообщения
        action: 'COUNT_MESSAGES',
        method: require('./Controllers/CountMessagesController').default
    }
]
