import io from 'socket.io-client'
import Host from '../../config'

const socket = io(Host)

export default socket