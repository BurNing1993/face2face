import React, { memo, useContext, useEffect, useState } from 'react'
import { MessageContext } from '../utils/message'
import { send, emitter } from '../utils/ws'

const Home: React.FC = () => {
  const [code, setCode] = useState('')
  const [inputCode, setInputCode] = useState('')
  const { message } = useContext(MessageContext)
  const connect = () => {
    if (inputCode.length === 6) {
      send({
        event: 'connect',
        data: code,
      })
    } else {
      message('code is invalid!')
    }
  }

  useEffect(() => {
    send({
      event: 'login',
    })
    emitter.on('logined', (data: any) => {
      setCode(data.code)
    })
  }, [])
  return (
    <div className="text-center">
      <div>your code : {code}</div>
      <div className="flex relative ">
        <input
          type="number"
          id="email-with-icon"
          className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="pal code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button
          className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm cursor-pointer disabled:text-red-500"
          onClick={connect}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default memo(Home)
function MessageContextProps(MessageContextProps: any) {
  throw new Error('Function not implemented.')
}
