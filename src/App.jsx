import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../context/AuthContext'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from '../components/PrivateRoute'

// Componente para proteger la ruta de login si el usuario ya está autenticado
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated() ? <Navigate to='/dashboard' replace /> : children
}

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Si el usuario está logueado, redirige a Dashboard */}
                    <Route
                        path='/login'
                        element={
                            <ProtectedRoute>
                                <LoginPage />
                            </ProtectedRoute>
                        }
                    />
                    {/* Ruta protegida para Dashboard */}
                    <Route
                        path='/dashboard'
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    {/* Ruta por defecto para redirección */}
                    <Route path='*' element={<Navigate to='/login' replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
