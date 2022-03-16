export default [
    {
        action: 'ECHO',
        method: require('./Controllers/EchoController').default
    },
    {
        action: 'DATA',
        method: require('./Controllers/DataController').default
    },
    {
        action: 'NEW_CHATS',
        method: require('./Controllers/NewChatsController').default
    },
    {
        action: 'VIEW_CHAT',
        method: require('./Controllers/ViewChatController').default
    },
    {
        action: 'ADD_MESSAGE',
        method: require('./Controllers/AddMessageController').default
    }
]
