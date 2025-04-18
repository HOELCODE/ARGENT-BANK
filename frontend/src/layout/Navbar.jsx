import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/argentBankLogo.png";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice.js';
import { fetchUserProfile } from "../redux/authSlice.js";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token, user, loading} = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/') // Redirection vers la page d'accueil après déconnexion
    }

    // Gérer l'affichage deu prenom dans la nav quand le user est connecté 
    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token));
        }
    }, [token, dispatch]);

    if (loading || !user) {
        return <p>Chargement...</p>
    }
      
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {token ? (
                    <div className="nav-logged">
                        <i className="fa-solid fa-circle-user"></i>
                        <span>{user.firstName}</span>
                        <Link className="main-nav-item" to="/" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </div>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-plus"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
