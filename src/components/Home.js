
import React, { useState, useContext, useRef, useEffect } from 'react'
import "./Home.css"
import dataContext from '../context/dataContext'
import Modal from '../components/Modal'
import html2canvas from 'html2canvas';
import imageCompression from 'browser-image-compression';
import { db } from "./database/realtime-db";
import { ref, get,set, child } from "firebase/database";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
// import revenueData from "./Data.json";
import { div } from '@tensorflow/tfjs';
 

 
const Home = () => {
  const delay = 2500;
  const context = useContext(dataContext)
  const { email, full_name, setFullName, setEmail, password, setPassword, showLoginForm, setShowLoginForm, showRegistration, setShowRegistration, formData, setFormData, errorMessage, setErrorMessage, reminder, setReminder, isLoggedIn, setIsLoggedIn, userId, setUserId, reminderId, setReminderId, mlout, setMlout,temp,setTemp,press,setPressure,dist,setDistance,direct,setDirection,urlIm,setIM } = context
  const videoRef = useRef(null);
  const[Loader,setLoader]=useState(false);

  //fetch the data 

  const fetchData = () => {
    console.log("fetch is calling")
    const rootRef = ref(db); // Assuming 'db' is initialized with the provided Firebase reference
    get(rootRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
      setTemp(data.myData.temperature);
      setPressure(data.myData.pressure);
      setDistance(data.myData.distance);
      setDirection(data.myData.direction);
      appendData();
       
      } else {
        console.log('No data found at the root level.');
      }
    }).catch((error) => {
      console.error('Error fetching data from Firebase:', error);
    });
  };
  

  // const sett = () => {
    
  
  //   const userRef = ref(db, "myData");
  //   const newData = {
  //     temperature: temp,
  //     pressure: press,
  //     distance: dist,
  //     direction: direct,
  //   };
  
  //   // Set the new data in the database
  //   set(userRef, newData)
  //     .then(() => {
  //       console.log('Data set successfully in Firebase');
  //     })
  //     .catch((error) => {
  //       console.error('Error setting data in Firebase:', error);
  //     });
  // };

   
      fetchData();
  
 
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadedmetadata', () => {
          // predict();
          // connectToDB();
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };


  const predict = async () => {
    console.log('Predict function called');
    try {
      // http://localhost:3000/img.png
      // https://pub.mdpi-res.com/applsci/applsci-13-03564/article_deploy/html/images/applsci-13-03564-g006.png
      const response = await fetch(`http://localhost:5000/api/v1/auth/image/classify?imageUrl=${urlIm}`);
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === true) {
        console.log(result+11111);
        setMlout(result.message.maxClass);
        setLoader(false)
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const downloadimg= async()=>{
    setLoader(true);
    // const element = document.getElementById('home-container'); // Use the ID of the top-level container
    try{
      const canvas = await html2canvas(document.querySelector('.print'));
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      const a = document.createElement('a');
      a.href = dataUrl;
      const randomNumber = Math.floor(Math.random() * 1000);
      setIM(`http://localhost:3000/static/image-${randomNumber}.jpg`)
      a.download = `image-${randomNumber}.jpg`;
      a.click();
      console.log(urlIm)
      await predict();
    }
      catch (error) {
        console.error('Error in downloadimg:', error);
      }  
    
  }

  useEffect(() => {
    startCamera(); // Start the camera when the component mounts
    
    const intervalId = setInterval(() => {
      fetchData();
    },  20000);

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, []);


   
  const [revenueData, setRevenueData] = useState([
    {
      label: Date.now(),
      Pressure: 0,
      Temp: 0,
    },
  ]);

  const appendData = () => {
    const newData = {
      label: Date.now(),
      Pressure:press*10,
      Temp:temp
    };

    // Update the state with the new data
    setRevenueData(prevData => [...prevData, newData]);
  };

  return (
  <div> 
    <div className="home-container">
      <div className="camera-container">
        <div className="print" >
        <video   ref={videoRef} width="580px" height="390px" autoPlay></video>
        </div>
        <button className="Conn" onClick={startCamera}>Connect_Camera</button>
        <button className='Disc' onClick={stopCamera}>Disconnect_Camera</button>
        <button onClick={downloadimg}>Predict</button>
          {Loader && <div className="loader">Predict...</div>} 
      </div>
      <div className="rightside">
        <p>status class :-{mlout}</p>
        <p>Temperature: {temp} c</p>
        <p>Pressure: {press*1000000} Pa</p>
        <p>Direction: {direct}</p>
        <p>Date and Time: {new Date().toLocaleString()}</p>
      </div>

    </div>
    <div className="dataCardrevenueCard">
    <Line
          data={{
            labels: revenueData.map(data => new Date(data.label).toLocaleTimeString()),
            datasets: [
              {
                label: "Pressure",
                data: revenueData.map((data) => data.Pressure),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "Temp",
                data: revenueData.map((data) => data.Temp),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Temp vs Pressure",
              },
            },
          }}
        />
      </div>
  </div>



  )
}

export default Home