import React ,{useContext}from 'react'
import './Registation.css'
import dataContext from '../context/dataContext'
import { useNavigate } from 'react-router-dom';
 

const Registation=()=>{
  const navigate = useNavigate();
   const context = useContext(dataContext)
   const {email, full_name,setFullName,setEmail,password, setPassword, errorMessage, setErrorMessage} = context
  
   const handleclick = () => {
    

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      full_name: full_name,
      email: email,
      password: password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('http://localhost:5000/api/v1/auth/register', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          localStorage.setItem('token', result.token);
          navigate('/Login');
        } else {
          setErrorMessage(result.message);
        }
      })
      .catch((error) => console.log('error', error));

       
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr/>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <label htmlFor="full_name"><b>Full Name</b></label>
      <input type="text" placeholder="Enter Full Name" name="full_name" id="full_name" value={full_name} onChange={(e) => setFullName(e.target.value)}  required/>
  
      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)} required/>
  
      <label htmlFor="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" id="psw"  onChange={(e) => setPassword(e.target.value)} required/>
  
       
      <button type="submit" className="registerbtn" onClick={ handleclick}>Register</button>
    
     
    </div>
  
  )
}

export default Registation