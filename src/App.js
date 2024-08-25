import { useState} from 'react'
import Register from "./Screens/Register";
import Admin from './Screens/Admin'

import {Provider, useDispatch, useSelector} from 'react-redux'


import {Route, Routes, BrowserRouter as Router, Navigate} from 'react-router-dom'
import Cookies  from 'js-cookie';
import Navbar from "./components/Navbar";
import { setIsLoggedIn } from './slices/userSlice';
import Login from './Screens/Login';
import AddStudent from './Screens/Admin/AddStudent';
import Attendance from './Screens/Admin/Attendance';
import Sidebar from './components/Sidebar';
import Intro from './Screens/Intro';


function App() {
  const [sidebarOpen, setsidebarOpen] = useState(false)
  const {isLogin} = useSelector((state) => state.user);

  return (

    
      <div className="">
        <Router>
          <Navbar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen}/>
          {
            isLogin ?  (
              <div>
                <Sidebar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen}/>
                {
                  sidebarOpen ? (<div className='w-screen h-screen fixed z-10 top-0 bg-black/20' onClick={() => setsidebarOpen(false)}></div>): (<div></div>)
                }
                <Routes>
                    
                    <Route path="/" exact element={<Admin />}/>
                    <Route path="/attendance"  element={<Attendance />}/>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            
              ) : (
              // Not logged in
                <div className='md:grid md:grid-cols-2'>
                <Intro />
                <Routes>
                  <Route path="/signup" exact element={<Register />}/>
                  <Route path="/login" exact element={<Login />}/>
                  <Route path="*" element={<Navigate to="/signup" />} />
                </Routes>
                </div>
               
              )
          }
         

      
        </Router>
        
      </div>

  );
}

export default App;
