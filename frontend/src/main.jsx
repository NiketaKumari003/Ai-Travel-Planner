import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Planner from './pages/Planner'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/planner">Plan Trip</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/planner" element={<Planner/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
