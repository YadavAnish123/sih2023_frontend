import React,{useContext}from 'react';
import "./Navebar.css"
// import Login from './Login';
import dataContext from '../context/dataContext'
// import Registation from './Registation';
import { NavLink } from 'react-router-dom';


const Navebar = () => {
  // const handleLoginClick = () => {
  //   setShowLoginForm(true);
  // }
  // const handleRegistrationClick = () => {
  //   setShowRegistration(true);
  // }
  const context = useContext(dataContext)
  //  const {email, full_name,setFullName,setEmail,password, setPassword } = context
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>Application Name</h1>
      </div>
      
      <div className="navbar-right">
        <NavLink className="navbar-button"   to="/">Home</NavLink>
         <NavLink className="navbar-button"   to="/Registration">Registration</NavLink>
        <NavLink className="navbar-button"   to="/Login">Login</NavLink>
        <NavLink className="navbar-button"   to="/table">Table</NavLink>
      </div>
      {/* {showLoginForm && <Login/>}
      {showRegistration&& <Registation/>} */}
    </div>
  );
}

export default Navebar;
