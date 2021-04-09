const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });
const code2ws = new Map()

const getCode = () => Math.floor(Math.random() * (999999 - 100000)) + 100000;

wss.on('connection', function connection(ws, request) {
  console.log('connection');
  ws.sendData = (event, data) => {
    ws.send(JSON.stringify({ event, data }));
  };
  ws.sendError = msg => {
    ws.sendData('error', { msg })
  };
  let ip = request.socket.remoteAddress.replace('::ffff:', '');
  console.log('ip is connected', ip)
  const code = getCode()
  code2ws.set(code, ws)
  console.log(code2ws.keys());
  ws.on('message', function incoming(message) {
    // {event,data}
    console.log('incoming message', message);
    let parsedMessage = {}
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error('parse error', error)
      ws.sendError('message not valid')
      return
    }
    let { event, data } = parsedMessage
    if (event === 'login') { // 登录获取code
      ws.sendData('logined', { code })
    } else if (event === 'connect') { //连接设备
      let remote = +data.remote
      if (code2ws.has(remote)) {
        ws.sendData('connected', { remote })
        let remoteWS = code2ws.get(remote)
        ws.sendRemote = remoteWS.sendData
        remoteWS.sendRemote = ws.sendData
        ws.sendRemote('be-connected', { remote: code })
      } else {
        ws.sendError('user not found')
      }
    } else if (event === 'forward') { // 转发code
      ws.sendRemote(data.event, data.data)
    } else {
      ws.sendError('message not handle', message)
    }
  })

  ws.on('close', () => {
    code2ws.delete(code)
    delete ws.sendRemote
    clearTimeout(ws._closeTimeout);
  })

  ws._closeTimeout = setTimeout(() => {
    ws.terminate();
  }, 600000);
})