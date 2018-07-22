import io from 'socket.io-client'

const socket = io('http://:8080')

export default socket