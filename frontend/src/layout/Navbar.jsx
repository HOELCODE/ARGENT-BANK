import { Link } from "react-router-dom";
import logo from "../images/argentBankLogo.png";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const token = useSelector((state) => state.auth.token)
  
    const handleLogout = () => {
      dispatch(logout())
      navigate('/') // Redirection vers la page d'accueil après déconnexion
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
                    <Link className="main-nav-item" to="/" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                ) : (
                    <Link className="main-nav-item" to="/sign-up">
                        <i className="fa fa-user-plus"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
