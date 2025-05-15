import { useEffect, useState} from 'react'
import Register from "./Screens/Register";


import {useDispatch, useSelector} from 'react-redux'


import {Route, Routes, BrowserRouter as Router, Navigate, useLocation} from 'react-router-dom'

import Navbar from "./components/Navbar";
import Login from './Screens/Login';
import Attendance from './Screens/Admin//Attendance/Attendance.jsx';
import Sidebar from './components/Navbar/Sidebar.jsx';
import Intro from './Screens/Intro';
import Profile from './Screens/Admin/Profile/Profile.jsx';
import { setLoginState } from './slices/userSlice.js';
import Admin from './Screens/Admin/Admin.jsx';
import TimeTable from './Screens/Admin/TimeTable/TimeTable.jsx';
import FeesManagement from './Screens/Admin/Profile/components/FeesManagement/FeesManagement.jsx';
import PaymentForm from './Screens/Admin/Profile/components/Payment/PaymentForm.jsx';
import UploadVideos from './Screens/Admin/Profile/components/UploadVideos/UploadVideos.jsx';

function App() {
  const [sidebarOpen, setsidebarOpen] = useState(false)
  const {isLogin} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoginState()); 
    }
  }, []);
  return (

    
      <div className="relative ">
        <Router>
          <div className='fixed top-0 w-full z-20'>
            <Navbar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen} />
          </div>
          {
            isLogin ?  (
              <div>
                <Sidebar sidebarOpen={sidebarOpen} setsidebarOpen={setsidebarOpen}/>
                {
                  sidebarOpen ? (<div className='w-screen h-screen fixed z-10 top-0 bg-black/20' onClick={() => setsidebarOpen(false)}></div>): (<div></div>)
                }

                {/* LOGGED IN */}
                <Routes>
       
                    <Route path="/" exact element={<Admin />}/>
                    <Route path="/attendance"  element={<Attendance />}/>
                    <Route path="/profile"  element={<Profile />}/>
                    <Route path="/timetable"  element={<TimeTable />}/>
                    <Route path="/fees"  element={<FeesManagement />}/>
                    <Route path="/uploadvideos"  element={<UploadVideos />}/>
                    <Route path="/payment"  element={<PaymentForm />}/>
                    <Route path="*" element={<Navigate to="/" />} />
      
                </Routes>
              </div>
            
              ) : (
              // Not logged in
                <div className='bg-slate-900 md:bg-slate-100 md:grid md:grid-cols-2'>
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
