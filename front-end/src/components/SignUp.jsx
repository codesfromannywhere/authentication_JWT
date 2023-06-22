import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss"

const defaultErrorState = Object.freeze({
    general: "",
    name: "",
    email: "",
    password: "",
});

const defaultData = Object.freeze({
    name: "",
    email: "",
    password: "",
});

const SignUp = () => {

    const [data, setData] = useState(defaultData)
    const navigate = useNavigate()
    const [error, setError] = useState(defaultErrorState);

    const handleSignIn = async (e) => {
        e.preventDefault()
        
        // Um dies zu prüfen, Inputfeler im Frontend ausfüllen
        console.log(data);
        await axios.post("/api/signup", data)
            .then((res) => {
                console.log(res)
                setData(defaultData);
                navigate("/login")
            }).catch((err) => {
                console.error(err)
                let responseError = error?.response?.data?.error;
                if (responseError?.errors) {
                    const propertyMessageMap = Object.entries(responseError.errors).reduce(
                        (acc, [key, value]) => {
                            acc[key] = value.message;
                            return acc;
                        },
                        {}
                    );
                    console.log(propertyMessageMap);
                    setError(propertyMessageMap);
                } else {
                    setError((prevError) => ({
                        ...prevError,
                        general: error?.response?.data?.error?.message || "",
                    }));
                }

            })
    }

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <Link to={"/login"} className="a-text">Already have an account? Login</Link>

            <form onSubmit={handleSignIn}>

                <label htmlFor="name" id="name" value="">Name</label>
                <input type="text" name="" id="name" placeholder="Type in your name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                <small>{error.name && error.name}</small>

                <label htmlFor="email" id="email">Email adress</label>
                <input type="email"
                    placeholder="Type in your email adress" id="email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                <small>{error.email && error.email}</small>

                <label htmlFor="password" id="password">Password</label>
                <input type="password"
                    placeholder="Type in password" id="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                <small>{error.password && error.password}</small>

                <button className="loginbtn">Sign Up</button>

            </form>

        </div>
    );
}

export default SignUp;