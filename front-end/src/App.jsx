import "./App.scss";
import { Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import User from "./pages/User";


function App() {

  return (
    <div className="App"> 
    <Routes>
      <Route path="/" element={<Nav />} />
      <Route path="/userprofil" element={<User />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
    </div>
  )
}

export default App;
