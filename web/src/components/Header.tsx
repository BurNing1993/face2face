import React, { memo } from 'react'

const Header: React.FC = () => {
  return (
    <header className="h-10 text-center">
      f2f
      <label
        htmlFor="Toggle1"
        className="inline-flex items-center space-x-4 cursor-pointer dark:text-coolGray-100"
      >
        <span>Left</span>
        <span className="relative">
          <input id="Toggle1" type="checkbox" className="hidden peer" />
          <div className="w-10 h-6 rounded-full shadow-inner dark:bg-coolGray-400 peer-checked:dark:bg-violet-400"></div>
          <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-coolGray-800"></div>
        </span>
        <span>Right</span>
      </label>
    </header>
  )
}

export default memo(Header)
