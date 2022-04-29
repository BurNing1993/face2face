import React, { memo, useState } from 'react'
import { createOffer,createAnswer } from '../utils/webrtc'

const Test: React.FC = () => {
  const [offer, setOffer] = useState('')
  const [remoteOffer, setRemoteOffer] = useState('')
  const onCreateOffer = async () => {
    const offer = await createOffer()
    setOffer(JSON.stringify(offer))
  }

  const onCreateAnswer =async ()=>{
      const offerSdp =new RTCSessionDescription(JSON.parse(remoteOffer))
      await createAnswer(offerSdp)
  }

  return (
    <div>
      <div>发送端</div>
      <div>
        <textarea
          className="text-black"
          value={offer}
          rows={10}
          onChange={(e) => setOffer(e.target.value)}
        />
        <button onClick={onCreateOffer}>创建信令</button>
      </div>
      <div>接收端</div>
      <div>
        <textarea
          className="text-black"
          rows={10}
          value={remoteOffer}
          onChange={(e) => setRemoteOffer(e.target.value)}
        />
        <button onClick={onCreateAnswer}>设置信令</button>
      </div>
    </div>
  )
}

export default memo(Test)
