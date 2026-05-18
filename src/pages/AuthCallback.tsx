import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
    const auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isLoading && auth.isAuthenticated) {
            navigate('/')
        }
    }, [auth.isLoading, auth.isAuthenticated, navigate])

    return <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Logging...</p>
    </div>
}