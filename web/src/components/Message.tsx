import React, { memo } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  content: React.ReactNode
}

const Message: React.FC<Props> = ({ content }) => {
  if (content != undefined && content !== '') {
    const node = (
      <div className="fixed top-10 left-1/2  text-white bg-black">
        <div className=" bg-blue-500 border-green-600  border-l-4   font-bold px-4 py-3 ">
          {content}
        </div>
      </div>
    )
    return ReactDOM.createPortal(node, document.body)
  }
  return null
}

export default memo(Message)
