import React,{ useState, useContext, useRef, useEffect } from 'react';
import dataContext from '../context/dataContext'
import './Table.css';

const Table = () => {
    const context = useContext(dataContext)
  const { email, full_name, setFullName, setEmail, password, setPassword, showLoginForm, setShowLoginForm, showRegistration, setShowRegistration, formData, setFormData, errorMessage, setErrorMessage, reminder, setReminder, isLoggedIn, setIsLoggedIn, userId, setUserId, reminderId, setReminderId, mlout, setMlout,temp,setTemp,press,setPressure,dist,setDistance,direct,setDirection,urlIm,setIM,data,setData } = context
  return (
    <table>
      <thead>
        <tr>
          <th>Serial No</th>
          <th>Image</th>
          <th>Temperature</th>
          <th>Pressure</th>
          <th>Time</th>
          <th>Point Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img src={item.imageUrl} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
            </td>
            <td>{item.temp}</td>
            <td>{item.pressure}</td>
            <td>{Date.now()}</td>
            <td>{item.Loacation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
