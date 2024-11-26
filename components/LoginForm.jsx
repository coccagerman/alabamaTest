import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const LoginForm = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        setError(null)

        try {
            await login(email, password)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
