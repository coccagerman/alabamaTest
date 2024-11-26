import { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const { authToken } = useAuth()

    useEffect(() => {
        console.log('authToken:', authToken)
        if (authToken) {
            // redirect to dashboard if user is already logged in
            window.location.href = '/dashboard'
        }
    }, [])

    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default LoginPage
