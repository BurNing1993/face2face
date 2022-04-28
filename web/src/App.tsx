import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Message from './components/Message'
import Home from './pages/home'
import { MessageContext } from './utils/message'

function App() {
  const [msg, setMsg] = useState('')
  const showMessage = (s: string) => {
    setMsg(s)
    setTimeout(() => {
      setMsg('')
    }, 1500)
  }
  return (
    <MessageContext.Provider value={{ message: showMessage }}>
      <BrowserRouter>
        <div className="font-mono text-sm md:text-base text-white bg-black min-h-screen">
          <Header />
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Message content={msg} />
    </MessageContext.Provider>
  )
}

export default App
