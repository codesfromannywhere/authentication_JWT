import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/login"}>Login In</Link>

        </div>
    );
}

export default Nav;