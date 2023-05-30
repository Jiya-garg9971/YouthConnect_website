import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter, Navigate, Route, Router, Routes} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./components/messenger";

function App() {
  const {user}=useContext(AuthContext);
  // console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user?<Home/>:<Register/>} />
       <Route exact path="/register" element={user ? <Navigate to="/" /> : <Register/>} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
          
         <Route path="/messenger" element={user?<Messenger/>:<Login/>} />
         <Route path="/profile/:username" element={<Profile />} />
</Routes>
</BrowserRouter>
      {/* <Profile/> */}
      {/* <Register/> */}
     
    </div>
  );
}

export default App;
