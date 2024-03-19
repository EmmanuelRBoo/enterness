import { io } from '..'
import { getChat } from '../services/chat'

io.on("connection", (socket) => {
    socket.on("online", (data) => {
        socket.join(data.phone)
    })
    
    socket.on("add_chat", async (data) => {
        const chat = await getChat({ ownerPhone: data.myPhone, userPhone: data.phone })
        
        console.log('add ' + chat)

        io.to(data.phone).emit("add_chat", chat)
    })
})