import mitt from 'mitt'

export type WsEvent = 'login' | 'connect' | 'forward' | 'logined'

export interface WsMessage<T = string> {
  event: WsEvent
  data?: T
}

const ws = new WebSocket('ws://localhost:3000/api')
export const emitter = mitt<Record<WsEvent, any>>()

emitter.on('*', (...args) => {
  console.log(`[${new Date().toLocaleString()}]:`, ...args)
})

let pendingData: WsMessage[] = []

ws.onopen = () => {
  console.log('ws opened')
  if (pendingData.length > 0) {
    pendingData.forEach((msg) => {
      send(msg)
    })
    pendingData = []
  }
}

ws.onmessage = (event) => {
  try {
    const data: WsMessage = JSON.parse(event.data)
    emitter.emit(data.event, data.data)
  } catch (error) {
    console.error(error)
  }
}

ws.onerror = (error) => {
  console.error(error)
}

export function send(msg: WsMessage) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg))
  } else if (ws.readyState === WebSocket.CONNECTING) {
    pendingData.push(msg)
  } else {
    console.error(
      `WebSocket is CLOSING/CLOSED ${ws.readyState},data not send`,
      msg
    )
  }
}
