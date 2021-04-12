import emitter from './emitter'

export async function getCameraVideo(video: HTMLVideoElement) {
  try {
    let facingMode = 'environment';
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: {
        facingMode,
        width: { exact: 360, ideal: 720 },
        height: { exact: 480, ideal: 1920 }
      },
    }
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (_e) {
      video.play();
    };
  } catch (error) {
    console.error(error);
  }
}

/**
 * 获取摄像头视频流
 * @returns 
 */
export async function getCameraStream() {
  try {
    let facingMode = 'environment';
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: {
        facingMode,
        width: { exact: 360, ideal: 720 },
        height: { exact: 480, ideal: 1920 },
      },
    }
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    return mediaStream
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const pc = new window.RTCPeerConnection({})

//@ts-ignore
pc.onaddstream = function (e: MediaStreamEvent) {
  // TODO
  console.log("onaddstream", e.stream);
  emitter.emit('add-stream', e.stream)
}

pc.onicecandidate = function (e) {
  console.log('onicecandidate', e.candidate);
  if (e.candidate) {
    emitter.emit('send', {
      event: 'forward',
      data: { event: 'p1-candidate', data: e.candidate }
    })
  }
}
/**
 *  发起端
 */
/**
 * 发出offer 发起连接请求
 * @returns 
 */
export async function createOffer() {
  try {
    const offer = await pc.createOffer({
      voiceActivityDetection: true,
      offerToReceiveAudio: true,
    })
    await pc.setLocalDescription(offer)
    console.log('pc offer');
    return pc.localDescription
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function setRemote(description: RTCSessionDescriptionInit) {
  await pc.setRemoteDescription(description)
}

let candidates: RTCIceCandidateInit[] = []
export async function addIceCandidate(candidate: RTCIceCandidateInit) {
  if (candidate) {
    candidates.push(candidate)
  }
  if (pc.remoteDescription && pc.remoteDescription.type) {
    for (const can of candidates) {
      await pc.addIceCandidate(new RTCIceCandidate(can))
    }
    candidates = []
  }
}

/**
 *  接收端
 */
export async function createAnswer(offer: RTCSessionDescriptionInit) {
  try {
    const cameraStream = await getCameraStream()
    //@ts-ignore https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addStream
    pc.addStream(cameraStream);
    // cameraStream.getTracks().forEach(track => {
    //   pc.addTrack(track)
    // })
    await pc.setRemoteDescription(offer)
    await pc.setLocalDescription(await pc.createAnswer())
    console.log('answer', JSON.stringify(pc.localDescription));
    return pc.localDescription
  } catch (error) {
    console.error(error);
    throw error
  }
}

