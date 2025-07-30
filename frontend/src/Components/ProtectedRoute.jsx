import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import wellnessContext from '../context/wellnessContext'

const ProtectedRoute = () => {

    const { token } = useContext(wellnessContext)

  return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute