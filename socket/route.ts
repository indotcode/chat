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
        action: 'USER',
        method: require('./Controllers/UserController').default
    },
    {
        action: 'NEW_CHATS',
        method: require('./Controllers/NewChatsController').default
    }
]
