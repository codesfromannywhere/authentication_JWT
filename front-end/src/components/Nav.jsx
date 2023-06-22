import { Link } from "react-router-dom";
import "./Nav.scss"


const Nav = () => {
    return (
        <div>
            <nav className="navbar">
                <Link to={"/login"} className="loginbtn">Log In</Link>
                <Link to={"/signup"} className="signupbtn">Sign Up</Link>
            </nav>
        </div>
    );
}

export default Nav;

