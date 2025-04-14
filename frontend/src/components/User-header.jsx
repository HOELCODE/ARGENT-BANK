import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../redux/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const { user, token, loading } = useSelector((state) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token))
        }
    }, [token, dispatch])

    if (loading || !user) {
        return <p>Chargement...</p>
    }

    return (
        <div className="header">
            <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
            <button className="edit-button">Edit Name</button>
            <div className='inputs-container'>
                <input type='name' placeholder={user.firstName} className='first-name'></input>
                <input type='name' placeholder={user.lastName} className='last-name'></input>
            </div>
            <div className='buttons-container'>
                <button className='save-button'>Save</button>
                <button className='cancel-button'>Cancel</button>

            </div>
        </div>
    )
}

export default Header
