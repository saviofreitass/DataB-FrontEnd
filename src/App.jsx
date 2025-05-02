import { useState } from 'react'
import './App.css'
import { Login } from './pages/login/Login'
import { Home } from './pages/inicio/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='' element={<Login />}/>
          <Route path='/home'  element={<Home />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App


