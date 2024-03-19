import { server } from './index'
import { PORT } from './constants'
import './controllers/messageSocket'
import './controllers/chatSocket'

server.listen(PORT, () => console.log('server up'))