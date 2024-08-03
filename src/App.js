import {useEffect, useState} from 'react'
import Register from "./Screens/Register";
import Admin from './Screens/Admin'

import {Provider, useDispatch, useSelector} from 'react-redux'
import store from './store'

import {Route, Routes, BrowserRouter as Router, Navigate} from 'react-router-dom'
import Cookies  from 'js-cookie';
import Navbar from "./components/Navbar";
import { setIsLoggedIn } from './slices/userSlice';
import Login from './Screens/Login';
import AddStudent from './Screens/Admin/AddStudent';
import Attendance from './Screens/Admin/Attendance';


function App() {

  const {isLogin} = useSelector((state) => state.user);
  const dispatch = useDispatch();




  return (

    
      <div className="">
        <Router>
          <Navbar />
          {
            isLogin ?  (
              
              <Routes>
                  
                  <Route path="/" exact element={<Admin />}/>
                  <Route path="/attendance"  element={<Attendance />}/>
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              ) : (

                // Not LoggedIn
                <Routes>
                  <Route path="/signup" exact element={<Register />}/>
                  <Route path="/login" exact element={<Login />}/>
                  <Route path="*" element={<Navigate to="/signup" />} />
                </Routes>
               
              )
          }
         

      
        </Router>
        
      </div>

  );
}

export default App;
