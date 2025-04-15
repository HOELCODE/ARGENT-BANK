import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, editUserProfile  } from '../redux/authSlice'

import '../css/User-header.css'

const Header = () => {

    // Gérer l'affichage du nom et prenom
    const dispatch = useDispatch()
    const { user, token, loading } = useSelector((state) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token))
        }
    }, [token, dispatch])

    // Gérer l'affichage du form pour editer le nom
    const [isEditing, setIsEditing] = useState(false)

    // Mettre à jour le nom et prenom
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editUserProfile({ firstName, lastName }))
    }


    if (loading || !user) {
        return <p>Chargement...</p>
    }

    return (
        <div className="header">
            <h1>Welcome back<br />{user.firstName} {user.lastName} !</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>

            {isEditing && (
                <div className='edit-container'>
                    <div className='column'>
                        <input type='name' placeholder={user.firstName} onChange={(e) => setFirstName(e.target.value)} className='first-name'></input>
                        <button className='save-button' onClick={handleSubmit}>Save</button>
                    </div>
                    <div className='column'>
                        <input type='name' placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)} className='last-name'></input>
                        <button className='cancel-button'>Cancel</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Header