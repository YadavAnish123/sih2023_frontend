import Registation from './components/Registation';
import Navebar from './components/Navebar';
import Login from './components/Login';
import Home from './components/Home'
import  Modal from './components/Modal'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React ,{useState}from 'react'
import DataState from './context/DataState';
import Footer from './components/Footer';
import Table from './components/Table';
// import TeachableMachineComponent from './components/TeachableMachineComponent';

function App() {
  
  
  return (
  
  <DataState>
     <Router>
     <>
     <Navebar />
    <Routes>
     
     
      
     <Route exact path='/' element={<Home/>}></Route>
     {/* <Route exact path='/' element={<TeachableMachineComponent/>}></Route> */}
     <Route exact path='/Login' element={<Login/>}></Route>
     <Route exact path='/Registration' element={<Registation/>}></Route>
     <Route exact path='/table' element={<Table/>}></Route>

       
       
    
     </Routes>
     <Footer/>
     </>
  </Router>
  </DataState>




  );
}

export default App;