import { Outlet } from "react-router-dom";
import "./App.css";
import Register from "../src/components/Register";
import Login from "./components/Login";

import { useState,useEffect } from "react";



function App() {

  const [user, setUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      fetch("https://fleet-api1.onrender.com/check_login" , {
        headers: { 'Authorization': `Bearer ${token}` }

      })
      .then((res) => res.json())
      .then((data) => setUser(data))

    }
  }, [])
 
  return (
    <div className="App">
     <Outlet context = {[user,setUser]}/>


      
    </div>
  );
}

export default App;