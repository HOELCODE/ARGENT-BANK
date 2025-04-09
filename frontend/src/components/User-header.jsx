import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile } from '../redux/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, token, loading } = useSelector((state) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token))
        } else {
            navigate('/login')
        }
    }, [token, dispatch, navigate])

    if (loading || !user) {
        return <p>Chargement...</p>
    }

    return (
        <div className="header">
            <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
            <button className="edit-button">Edit Name</button>
        </div>
    )
}

export default Header
