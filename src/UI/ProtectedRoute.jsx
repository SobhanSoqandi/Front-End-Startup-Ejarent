import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthorize from '../components/Auth/useAuthorize'
import toast from 'react-hot-toast'
import Loading from './Loading'

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuthorize();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("لطفا ابتدا وارد حساب خود شوید")
      navigate("/auth")
    }

  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-100">
        <Loading />
      </div>
    )
  }

  
  if (isAuthenticated) {
    return children
  }

 
}

export default ProtectedRoute
