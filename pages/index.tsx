import { useState } from "react";

export default function Home() {
  const [remoteCode, setRemoteCode] = useState('');
  const [localCode, setLocalCode] = useState('');
  // 0未连接，1已控制，2被控制
  const [controlText, setControlText] = useState('');

  const handleContextMenu=()=>{}
  const startControl = (remoteCode)=>{}

  return (
    <>
      <main>
        {
          controlText === '' ? <>
            <div>你的控制码 <span onContextMenu={(e) => handleContextMenu(e)}> {localCode} </span></div>
            <input className="border border-gray-600" type="text" value={remoteCode} onChange={(e) => setRemoteCode(e.target.value)} />
            <button onClick={() => { startControl(remoteCode) }}>确认</button>
          </> : <div>{controlText}</div>
        }
      </main>
    </>
  )
}
