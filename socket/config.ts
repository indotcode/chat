const bd = "chats"
export default {
    connect: "mongodb://root:123dsd1223wwpps@127.0.0.1:27017/chats?authSource=admin",
    params: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    apiGate: [
        {
            domain: "https://demo.fsego.com",
            code: "qe32ed3sf223s2wd2s332r3"
        }
    ]
}