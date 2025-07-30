import React from 'react'
import { Routes,Route,useLocation } from 'react-router-dom'
import Login from './Pages/login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import MySession from './Pages/MySession'
import Nav from './Components/Nav'
import ProtectedRoute from './Components/ProtectedRoute'
import Sessiondetail from './Pages/Sessiondetail'
import SessionForm from './Pages/Sessionform'
import Draft from './Pages/Draft'

const App = () => {

  const location =  useLocation()
  const hideNav = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div>
      {!hideNav && <Nav />}

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected  route */}
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mysession" element={<MySession />} />
        <Route path="/session/:id" element={<Sessiondetail />} />
        <Route path="/create-session" element={<SessionForm />} />
        <Route path="/draft-session" element={<Draft />} />
        <Route path="/edit-session/:id" element={<SessionForm />} />
        </Route>
        
      </Routes>
    </div>
  )
}

export default App