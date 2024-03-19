import { io } from '..'
import { postMessage } from '../services/message'

io.on("connection", (socket) => {

    socket.on("open_chat", async (data) => {

        socket.join(data.id)
    })

    socket.on("messages", (data) => {
        postMessage(data)
            .then(res => {
               io.to(data.chatId).emit("messages", res)
            })
    })
})