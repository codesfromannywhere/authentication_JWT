import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        // Um dies zu prüfen, Inputfeler im Frontend ausfüllen
        console.log(data);
        await axios.post("/api/signup", data)
            .then((res) => {
                console.log(res)
                navigate("/login")
            }).catch((err) => {
                console.error(err)
            })

    }

    return (
        <div>
            <h2>Sign Up</h2>
            <Link to={"/login"}>Already have an account? Login</Link>

            <form onSubmit={handleSignIn}>

                <label htmlFor="name" id="name" value="">name</label>
                <input type="text" name="" id="name" placeholder="Type in your name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />

                <label htmlFor="email" id="email">Type in your email adress</label>
                <input type="email"
                    placeholder="Type in your email adress" id="email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                <label htmlFor="password" id="password">Password</label>
                <input type="password"
                    placeholder="Type in password" id="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                <label htmlFor="password" id="password" />
                <button>Sign Up</button>

            </form>

        </div>
    );
}

export default SignUp;