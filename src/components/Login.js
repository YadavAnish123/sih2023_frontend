import React, { useContext } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import dataContext from '../context/dataContext'

const Login = () => {
  // State to store the email and password values
  const navigate = useNavigate();

  const context = useContext(dataContext)
  const {email, full_name,setFullName,setEmail,password, setPassword,errorMessage, setErrorMessage,userId,setUserId} = context
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
     
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI2N2M0YWU0NDJmM2ZjODFiNDY5YWEiLCJpYXQiOjE2OTcwMjEwMDgsImV4cCI6MTcwMjIwNTAwOH0.BkoyOpdP6JENYFqMnC7X7bWOkGLMjkfaJWnhUj9uPWY"
    myHeaders.append("Authorization",token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/auth/login", requestOptions)
      .then(response => response.json()) 
      .then((result) => {
        if (result.status === true) {
           
            setUserId(result.data._id)
            console.log(result)
          navigate('/');
        } else {
          setErrorMessage(result.message);
        }
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div className='Login_body'>
      {errorMessage && <h6 className="error-message">{errorMessage}</h6>}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
          //console.log(e.target.value); // Check if this logs the correct value
          setEmail(e.target.value);
        }} required />
        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} required />
      </div>
       
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;
