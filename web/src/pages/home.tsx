import React, { memo } from 'react'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <div>your code : 555</div>
      <div className="flex relative ">
        <input
          type="number"
          id="email-with-icon"
          className=" rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="pal code"
        />
        <button
          disabled
          className="rounded-r-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm cursor-pointer disabled:text-red-500"
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default memo(Home)
