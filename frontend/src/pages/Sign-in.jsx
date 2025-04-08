import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const SignIn = () => {

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
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="email" id="username" onChange={(e) => setEmail(e.target.value)}
          value={email}/>
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
            </section>
        </main>
    )
}

export default SignIn;