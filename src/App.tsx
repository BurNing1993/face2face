import React, { useEffect, useRef, useState } from 'react';
import emitter from './utils/emitter'
import './utils/signal'

function App() {
  const [remoteCode, setRemoteCode] = useState('');
  const [localCode, setLocalCode] = useState('');
  const [connectState, setConnectState] = useState(false);
  const videoEl = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    emitter.on('open', () => {
      console.log('app open');
      emitter.emit('send', { event: 'login' })
    })
    emitter.on('logined', ({ code }) => {
      console.log('app logined', code);
      setLocalCode(code)
    })
  }, [])

  const connect = () => {
    if (remoteCode && remoteCode.length === 6) {
      emitter.emit('send', {
        event: 'connect',
        data:{
          remote: remoteCode
        }
      })
    }else{
      setConnectState(false)
    }
  }
  return (
    <div className="container h-screen mx-auto text-center">
      {
        connectState ? <video ref={videoEl} className="w-full h-full"></video> :
          <>
            <div>你的控制码 <span> {localCode} </span></div>
            <input
              className="border border-black"
              type="text"
              value={remoteCode}
              onChange={(e) => setRemoteCode(e.target.value)}
            />
            <button className="border border-black" onClick={connect}>确认</button>
          </>
      }
    </div>
  );
}

export default App;
