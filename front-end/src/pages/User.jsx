import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const User = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("/api/secure", { withCredentials: true })
            .then((res) => {
                console.log(res)
                setUser(res.data)
            }).catch((err) => {
                console.error(err)
            })
    }, [])
    // console.log(user);
    return (
        <>
            <h1>USERPROFIL</h1>
            {user ? <h1>Welcome {user.name}</h1> : <h1>Welcome</h1>}
            {user.email}
            <Link to={"/"}>Log Out</Link>
        </>
    );
}

export default User;