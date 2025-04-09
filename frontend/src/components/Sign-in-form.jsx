import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Form = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
      }
    
      useEffect(() => {
        if (token) {
          navigate('/profile')
        }
      }, [token, navigate])

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="email" id="username" onChange={(e) => setEmail(e.target.value)}
                    value={email} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                    value={password} />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
        </form>
    )
}

export default Form;