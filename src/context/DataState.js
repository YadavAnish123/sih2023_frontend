import React from 'react'
import dataContext from "./dataContext";
import { useState } from "react";
//import PropTypes from 'prop-types'

const DataState=(props)=> {
  const [email, setEmail] = useState("");
  // const[reminderId,setReminderId]=useState("")
   const[userId,setUserId]=useState("")
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [mlout,setMlout]=useState("Predicting");
  // const [showLoginForm, setShowLoginForm] = useState(false);
  // const [showRegistration, setShowRegistration] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // const[reminder,setReminder]=useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  console.log('isLoggedIn:',localStorage.getItem('token') ); 

  const[temp,setTemp]=useState("Connecting");
  const[press,setPressure]=useState("Connecting");
  const[dist,setDistance]=useState("Connecting");
  const[direct,setDirection]=useState("Connecting");
  const[urlIm,setIM]=useState("");
  const[data,setData]=useState([])
   

  return (
      <dataContext.Provider value={{email, full_name,setFullName,setEmail,password, setPassword,errorMessage, setErrorMessage,userId,setUserId,mlout,setMlout,temp,setTemp,press,setPressure,dist,setDistance,direct,setDirection,urlIm,setIM,data,setData}}>
      {props.children}
    </dataContext.Provider>
     
  )
}
 

export default  DataState