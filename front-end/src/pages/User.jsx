import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const User = () => {

    const { user, logout } = useContext(UserContext);
    // console.log(user);

    return (
        <>
            <h1>USERPROFIL</h1>
            {user ? <h1>Welcome {user.name}</h1> : <h1>Welcome</h1>}
            {user.email}
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default User;