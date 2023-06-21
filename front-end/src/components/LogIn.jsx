import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.scss"
const LogIn = () => {

    const navigate = useNavigate()


    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        // Um dies zu prüfen, Inputfeler im Frontend ausfüllen
        console.log(user);
        await axios.post("/api/login", user)
            .then((res) => {
                console.log(res)
                navigate("/userprofil")
            }).catch((err) => {
                console.error(err)
            })

    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Link to={"/signup"} className="a-text">New? Sign up here!</Link>

            <form onSubmit={handleLogin}>

                <label htmlFor="email" id="name">Email adress</label>
                <input type="email" placeholder="Type in your email adress" id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <label htmlFor="password" id="password">Password</label>
                <input type="password" placeholder="Type in your password" id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />

                <button className="loginbtn">Login</button>

            </form>
        </div>
    );
}

export default LogIn;