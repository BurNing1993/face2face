import mitt from 'mitt'
import { createAnswer, createOffer, setRemote } from './webRTC'

const emitter = mitt()
export default emitter

emitter.on('*', (type, data) => {
  console.log({
    type,
    data
  });
})

emitter.on('error', (error) => {
  console.error(error);
})

// 连接成功
emitter.on('connected', () => {
  createOffer().then(
    (offer) => {
      console.log('offer', offer?.type);
      emitter.emit('send', {
        event: 'forward',
        data: { event: 'offer', data: { type: offer?.type, sdp: offer?.sdp } }
      })
    }
  )
})

// 接收到offer
emitter.on('offer', (offer) => {
  const answer =  createAnswer(offer)
  if (answer) {
    emitter.emit('send', {
      event: 'forward',
      data: { event: 'answer', data: { type: offer?.type, sdp: offer?.sdp } }
    })
  }
})


// 接收到answer
emitter.on('answer', (answer) => {
  setRemote(answer)
})

