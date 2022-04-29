const peer = new RTCPeerConnection()

peer.ontrack = (event) => {
  console.log('ontrack', event)
}
peer.onicecandidate = (event) => {
  console.log(event, 'onicecandidate')
  if (event.candidate) {
    // 转发offer
  }
}
// 请求
// https://segmentfault.com/a/1190000020780854
// 1.发起请求
export async function createOffer() {
  const offer = await peer.createOffer()
  await peer.setLocalDescription(offer)
  return peer.localDescription
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices
export function getUserStream() {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  })
}

export function getDisplayStream() {
  return navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
}

export async function start() {
  await createOffer()
}

// 接收
// 设置信令
export function addIceCandidate(candidate: RTCIceCandidateInit) {
  peer.addIceCandidate(candidate)
}

export async function createAnswer(offer: RTCSessionDescriptionInit) {
  const stream = await getDisplayStream()
  for (const track of stream.getTracks()) {
    peer.addTrack(track)
  }
  const answer = await peer.createAnswer()
  peer.setRemoteDescription(offer)
  peer.setLocalDescription(answer)
  return peer.localDescription
}
