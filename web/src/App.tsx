import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <div className='font-mono text-sm md:text-base text-white bg-black min-h-screen'>
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
