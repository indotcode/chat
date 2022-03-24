# Чат для fsego.com

## Конфигурация сервера
```
Node 14.18.2
Npm 6.14.15
```
## Детали окружения

- Модуль ts-node надо установить глобально ```npm install -g ts-node```

## Документация запросов Ws

### Инициализация чата
**Запрос:**
```json lines
{
    action: "DATA(String)", // (Обязательно)
    chat_key: "(String)", //Ключ системы (Обязательно)
    user: {
        avatar: "(String)", // Картинка (Обязательно)
        email: "(String)", // E-mail (Обязательно)
        id: "(Integer|String)", // Идентификатор пользователя (Обязательно)
        last_name: "(String)", // Фамилия
        middle_name: "(String)", // Отчество
        name: "(String)", // Имя (Обязательно)
        phone: "(String)", // Телефон (Обязательно)
    }
}
```

### Создания нового чата
**Запрос:**
```json lines
{
    action: "NEW_CHATS(String)", // (Обязательно)
    chat_key: "(String)", //Ключ системы (Обязательно)
    user_sender: {
        avatar: "(String)", // Картинка (Обязательно)
        email: "(String)", // E-mail (Обязательно)
        id: "(Integer|String)", // Идентификатор пользователя (Обязательно)
        last_name: "(String)", // Фамилия
        middle_name: "(String)", // Отчество
        name: "(String)", // Имя (Обязательно)
        phone: "(String)", // Телефон (Обязательно)
    },
    user_recipient: {
        avatar: "(String)", // Картинка (Обязательно)
        email: "(String)", // E-mail (Обязательно)
        id: "(Integer|String)", // Идентификатор пользователя (Обязательно)
        last_name: "(String)", // Фамилия
        middle_name: "(String)", // Отчество
        name: "(String)", // Имя (Обязательно)
        phone: "(String)", // Телефон (Обязательно)
    }
}
```

### Переключения чата
**Запрос:**
```json lines
{
    action: "SWITCH_CHAT(String)", // (Обязательно)
    chat_key: "(String)", // Ключ системы (Обязательно)
    chats_id: "(String)", // Идентификатор чата (Обязательно)
}
```

### Выход пользователя из чата
**Запрос:**
```json lines
{
    action: "OUT_CHAT(String)", // (Обязательно)
    chat_key: "(String)", //Ключ системы (Обязательно)
    chats_id: "(String)", // Идентификатор чата (Обязательно)
}
```

### Отправка сообщения
**Запрос:**
```json lines
{
    action: "ADD_MESSAGE(String)", // (Обязательно)
    chats_id: "(String)", // Идентификатор чата (Обязательно)
    message: "(String)" // Текст сообщения (Обязательно)
}
```


### Просмотр сообщения
**Запрос:**
```json lines
{
    action: "VIEW_MESSAGE(String)", // (Обязательно)
}
```
- Данный метод можно реализовывать в ```setInterval``` чтобы получить свежие данные сообщения

### Прерывания разрыва соединения
**Запрос:**
```json linespin
"ping"
```
- Данный метод можно реализовывать в ```setInterval``` чтобы оповещать сервер ws о готовности пользователя