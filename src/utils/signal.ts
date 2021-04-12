import emitter from './emitter'

const wsUrl = "wss://localhost/wws"

function createSocket() {
  const socket = new WebSocket(wsUrl);
  socket.onopen = () => {
    emitter.emit('open')
  }
  socket.onmessage = (e) => {
    try {
     const data = JSON.parse(e.data)
      emitter.emit(data.event, data.data) // 响应消息
    } catch (error) {
      console.error('json parse error!', error);
    }
  }

  emitter.on('send',(data)=>{
    socket.send(JSON.stringify(data))
  })
  return socket
}

const socket = createSocket()

export default socket