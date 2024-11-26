import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const login = async (email, password) => {
        const formData = new URLSearchParams()
        formData.append('email', email)
        formData.append('password', password)

        try {
            const response = await fetch('https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })

            if (!response.ok) {
                if (response.status === 401) throw new Error('Invalid credentials')
                throw new Error('Something went wrong')
            }

            const data = await response.json()
            // Guardar token en sessionStorage
            sessionStorage.setItem('authToken', data.token)
            navigate('/dashboard')
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        // Remover el token de sessionStorage
        sessionStorage.removeItem('authToken')
        navigate('/login')
    }

    const isAuthenticated = () => {
        // Verificar si hay un token en sessionStorage
        return !!sessionStorage.getItem('authToken')
    }

    const getToken = () => {
        return sessionStorage.getItem('authToken')
    }

    return <AuthContext.Provider value={{ isAuthenticated, getToken, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
